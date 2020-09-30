import React from 'react';
import { render } from '@testing-library/react';
import { CircularProgress } from './CircularProgress';

describe('Components/Button', () => {
    it('<CircularProgress />', () => {
        render(<CircularProgress />);
    });
});
