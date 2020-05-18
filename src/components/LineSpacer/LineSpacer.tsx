import className from 'classnames';
import React from 'react';

interface LineSpacerProps {
    size?: 'xsmall' | 'small' | 'regular' | 'large';
}

export const LineSpacer: React.SFC<LineSpacerProps> = props => {
    return (
        <div
            className={className([
                'LineSpacer',
                {
                    'LineSpacer--xsmall': props.size === 'xsmall',
                    'LineSpacer--small': props.size === 'small',
                    'LineSpacer--regular': props.size === 'regular',
                    'LineSpacer--large': props.size === 'large',
                },
            ])}
        />
    );
};
