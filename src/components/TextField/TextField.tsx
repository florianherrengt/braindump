import React from 'react';

interface TextFieldProps {
    value?: string;
    onClick?(): void;
    onChange?(value: string): void;
    ariaLabel: string;
    placeholder: string;
    onKeyDown?: React.InputHTMLAttributes<HTMLInputElement>['onKeyDown'];
}

export const TextField: React.SFC<TextFieldProps> = props => {
    return (
        <input
            className='TextField'
            value={props.value}
            onClick={props.onClick}
            onKeyDown={props.onKeyDown}
            onChange={event =>
                props.onChange && props.onChange(event.target.value)
            }
            type='text'
            placeholder={props.placeholder}
        />
    );
};
