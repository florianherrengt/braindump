import React, { useState } from 'react';
import classNames from 'classnames';
import { routerUri } from '../../config';
import { $Keys } from 'utility-types';
import { useToggle } from '@umijs/hooks';

interface TopBarProps {
    elevated?: boolean;
    title?: string;
    location: string;
}

export const titles: { [key in $Keys<typeof routerUri>]: string } = {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    privacy: 'Privacy',
    termAndConditions: 'Terms and conditions',
    notes: 'Notes',
    settings: 'Settings',
    tags: 'Tags',
    search: 'Search',
    insights: 'Insights',
    paymentFailed: 'Payment failed',
};

const links: Array<{ label: string; uri: string }> = [
    { label: 'Notes', uri: routerUri.notes },
    { label: 'Settings', uri: routerUri.settings },
    { label: 'Tags', uri: routerUri.tags },
    { label: 'Search', uri: routerUri.search },
    { label: 'Insights', uri: routerUri.insights },
];

export const TopBar: React.SFC<TopBarProps> = props => {
    const { state, toggle } = useToggle(false);

    return (
        <div className={classNames(['TopBar', { elevated: props.elevated }])}>
            <button onClick={() => toggle()}>
                <i className='material-icons'>menu</i>
            </button>
            <div className='TopBar_Title'>{props.title}</div>
            <ul
                className={classNames([
                    'TopBar_Links',
                    { 'TopBar_Links--show': state },
                ])}
            >
                {links.map(({ label, uri }) => (
                    <li
                        className={classNames([
                            'TopBar_Links_Item',
                            {
                                'TopBar_Links_Item--active': props.location.includes(
                                    uri,
                                ),
                            },
                        ])}
                    >
                        {label}
                    </li>
                ))}
            </ul>
        </div>
    );
};
