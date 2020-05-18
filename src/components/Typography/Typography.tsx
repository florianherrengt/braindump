import classNames from 'classnames';
import React from 'react';

interface TypographyProps {
    className?: string;
    variant?: 'body1' | 'body2';
}

export const Typography: React.SFC<TypographyProps> = props => {
    return (
        <p className={classNames('Typography', props.className)}>
            {props.children}
        </p>
    );
};
