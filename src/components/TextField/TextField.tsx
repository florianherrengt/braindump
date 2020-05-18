import classNames from 'classnames';
import React from 'react';

interface TextFieldProps {
    className?: string;
    value?: string;
    onClick?(): void;
    onChange?(value: string): void;
    onFocus?: React.InputHTMLAttributes<HTMLInputElement>['onFocus'];
    ariaLabel: string;
    placeholder?: string;
    onKeyDown?: React.InputHTMLAttributes<HTMLInputElement>['onKeyDown'];
    onKeyUp?: React.InputHTMLAttributes<HTMLInputElement>['onKeyUp'];
    autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
    autoFocus?: React.InputHTMLAttributes<HTMLInputElement>['autoFocus'];
    disabled?: React.InputHTMLAttributes<HTMLInputElement>['disabled'];
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
    autoCapitalize?: React.InputHTMLAttributes<
        HTMLInputElement
    >['autoCapitalize'];
}

export const TextField: React.SFC<TextFieldProps> = props => {
    return (
        <input
            className={classNames('TextField', props.className)}
            onFocus={props.onFocus}
            value={props.value}
            autoCapitalize={props.autoCapitalize}
            type={props.type || 'text'}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            autoComplete={props.autoComplete}
            onClick={props.onClick}
            onKeyDown={props.onKeyDown}
            onKeyUp={props.onKeyUp}
            onChange={event =>
                props.onChange && props.onChange(event.target.value)
            }
            placeholder={props.placeholder}
        />
    );
};
