import React, {
    HTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
} from 'react';
import classNames from 'classnames';
import { Color, Variant } from '../../config/theme';

interface TextFieldProps {
    value?: string;
    onChange?(value: string): void;
    ariaLabel: string;
    placeholder: string;
}

export const TextField: React.SFC<TextFieldProps> = props => {
    return (
        <input
            className='TextField'
            value={props.value}
            onChange={event =>
                props.onChange && props.onChange(event.target.value)
            }
            type='text'
            placeholder={props.placeholder}
        />
    );
};
