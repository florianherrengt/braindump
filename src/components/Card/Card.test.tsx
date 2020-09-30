import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Card } from './Card';

describe('Components/Card', () => {
    it('render', () => {
        render(<Card />);
    });
    it('open and close actions', () => {
        render(
            <Card actions={[{ label: 'test', icon: 'test', onClick() {} }]} />,
        );
    });
});
