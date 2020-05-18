import className from 'classnames';
import React from 'react';

interface BlockSpacerProps {
    size?: 'small' | 'regular' | 'large';
}

export const BlockSpacer: React.SFC<BlockSpacerProps> = props => {
    return (
        <div
            className={className([
                'BlockSpacer',
                {
                    'BlockSpacer--small': props.size === 'small',
                    'BlockSpacer--regular': props.size === 'regular',
                    'BlockSpacer--large': props.size === 'large',
                },
            ])}
        />
    );
};
