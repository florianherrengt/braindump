import React from 'react';
import { render } from '@testing-library/react';
import { TextField } from './TextField';
import { Variant, Color } from '../../config/theme';

describe('Components/TextField', () => {
    it('render', () => {
        render(<TextField placeholder='test' ariaLabel='test' />);
    });
});
