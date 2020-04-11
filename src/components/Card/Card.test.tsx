import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Card } from './Card';

describe('Components/Card', () => {
    it('render', () => {
        render(<Card />);
    });
    it('open and close actions', () => {
        const random = Math.random();
        const { container } = render(
            <Card actions={[{ label: 'test', icon: 'test', onClick() {} }]} />,
        );
        expect(container.outerHTML).not.toContain(random);
        fireEvent.click(container.querySelector('button')!);
        expect(container.outerHTML).toContain(random);
        fireEvent.click(container.querySelector('button')!);
        expect(container.outerHTML).not.toContain(random);
    });
});
