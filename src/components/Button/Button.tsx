import React, {
    HTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
} from 'react';
import classNames from 'classnames';
import { Color, Variant } from '../../config/theme';

interface ButtonProps {
    className?: string;
    onClick?(): void;
    color?: Color;
    variant?: Variant;
    styles?: CSSProperties;
}

export const Button: React.SFC<ButtonProps> = props => {
    return (
        <button
            style={props.styles}
            className={classNames([
                props.className,
                'Button',

                {
                    'Button--primary':
                        props.variant === Variant.primary ||
                        props.variant === undefined,
                },
                {
                    'Button--secondary': props.variant === Variant.secondary,
                },
                {
                    'Button--tertiary': props.variant === Variant.tertiary,
                },
                {
                    'Button--positive': props.color === Color.positive,
                },
                {
                    'Button--negative': props.color === Color.negative,
                },
            ])}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};
