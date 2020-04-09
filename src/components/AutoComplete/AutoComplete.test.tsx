import React from 'react';
import { render } from '@testing-library/react';
import { AutoComplete } from './AutoComplete';
import { Variant, Color } from '../../config/theme';

describe('Components/AutoComplete', () => {
    it('render', () => {
        render(<AutoComplete data={[]} placeholder='test' ariaLabel='test' />);
    });
});
