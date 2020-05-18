import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import { Color, Variant } from '../../config/theme';

interface ButtonProps {
    className?: string;
    onClick?(): void;
    color?: Color;
    variant?: Variant;
    styles?: CSSProperties;
    ariaLabel: string;
    disabled?: boolean;
    type?: React.ButtonHTMLAttributes<HTMLInputElement>['type'];
}

export const Button: React.SFC<ButtonProps> = props => {
    return (
        <button
            disabled={true}
            aria-label={props.ariaLabel}
            style={props.styles}
            type={props.type}
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
