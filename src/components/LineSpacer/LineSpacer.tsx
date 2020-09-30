import className from 'classnames';
import React from 'react';

interface LineSpacerProps {
    size?: 'xxsmall' | 'xsmall' | 'small' | 'regular' | 'large';
}

export const LineSpacer: React.SFC<LineSpacerProps> = props => {
    return (
        <div
            className={className([
                'LineSpacer',
                {
                    'LineSpacer--xxsmall': props.size === 'xxsmall',
                    'LineSpacer--xsmall': props.size === 'xsmall',
                    'LineSpacer--small': props.size === 'small',
                    'LineSpacer--regular': props.size === 'regular',
                    'LineSpacer--large': props.size === 'large',
                },
            ])}
        />
    );
};
