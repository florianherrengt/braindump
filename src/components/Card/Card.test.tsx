import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Card } from './Card';
import { Variant, Color } from '../../config/theme';

describe('Components/Card', () => {
    it('render', () => {
        render(<Card />);
    });
    it('open and close actions', () => {
        const random = Math.random();
        const { container } = render(<Card actions={<div>{random}</div>} />);
        expect(container.outerHTML).not.toContain(random);
        fireEvent.click(container.querySelector('button')!);
        expect(container.outerHTML).toContain(random);
        fireEvent.click(container.querySelector('button')!);
        expect(container.outerHTML).not.toContain(random);
    });
});
