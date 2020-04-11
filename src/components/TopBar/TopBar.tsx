import { useToggle } from '@umijs/hooks';
import classNames from 'classnames';
import React from 'react';
import { $Keys } from 'utility-types';
import { routerUri } from '../../config';
import { Variant } from '../../config/theme';
import { Button } from '../Button';

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

export const getTitle = (location: string): string => {
    return links.find(link => link.uri.includes(location))?.label || '';
};

export const TopBar: React.SFC<TopBarProps> = props => {
    const { state, toggle } = useToggle(false);

    return (
        <div className={classNames(['TopBar', { elevated: props.elevated }])}>
            <div className='flex grow'>
                <Button
                    className='TopBar_Button_Open-Menu'
                    variant={Variant.tertiary}
                    ariaLabel='open menu'
                    onClick={() => toggle()}
                >
                    <i className='material-icons'>menu</i>
                </Button>
                <div className='TopBar_Title grow'>
                    {getTitle(props.location)}
                </div>
                <div className='TopBar_Title--scramblr '>Scramblr</div>
            </div>
            <ul
                className={classNames([
                    'TopBar_Links',
                    { 'TopBar_Links--show': state },
                ])}
            >
                {links.map(({ label, uri }) => (
                    <li
                        key={uri}
                        className={classNames([
                            'TopBar_Links_Item',
                            {
                                'TopBar_Links_Item--active': props.location.includes(
                                    uri,
                                ),
                            },
                        ])}
                    >
                        <a href={uri}>{label}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
