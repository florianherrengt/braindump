import { render } from '@testing-library/react';
import React from 'react';
import { routerUri } from '../../config';
import { getTitle, TopBar } from './TopBar';

describe('Components/TopBar', () => {
    it('render', () => {
        render(<TopBar location='/notes' />);
    });
    it('find the title for the location', () => {
        expect(getTitle(routerUri.notes)).toEqual('Notes');
    });
});
