import classNames from 'classnames';
import React from 'react';

interface TypographyProps {
    className?: string;
    variant?: 'body1' | 'body2';
    error?: boolean;
}

export const Typography: React.SFC<TypographyProps> = props => {
    return (
        <p
            className={classNames('Typography', props.className, {
                'Typography--body2': props.variant === 'body2',
                'Typography--error': props.error,
            })}
        >
            {props.children}
        </p>
    );
};
