import { render } from '@testing-library/react';
import React from 'react';
import { Typography } from './Typography';

describe('Components/Typography', () => {
    it('render', () => {
        render(<Typography>Hello</Typography>);
    });
});
