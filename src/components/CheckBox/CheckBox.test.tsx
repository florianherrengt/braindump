import { render } from '@testing-library/react';
import React from 'react';
import { CheckBox } from './CheckBox';

describe('Components/CheckBox', () => {
    it('<CheckBox ariaLabel="test" />', () => {
        render(<CheckBox ariaLabel='test' />);
    });
});
