import classNames from 'classnames';
import React, { Fragment } from 'react';
import { Typography } from '../Typography';
import { LineSpacer } from '../LineSpacer';

interface TextFieldProps {
    className?: string;
    value?: string;
    onClick?(): void;
    onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
    id?: React.InputHTMLAttributes<HTMLInputElement>['id'];
    onFocus?: React.InputHTMLAttributes<HTMLInputElement>['onFocus'];
    ariaLabel: string;
    placeholder?: string;
    onKeyDown?: React.InputHTMLAttributes<HTMLInputElement>['onKeyDown'];
    onKeyUp?: React.InputHTMLAttributes<HTMLInputElement>['onKeyUp'];
    autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
    autoFocus?: React.InputHTMLAttributes<HTMLInputElement>['autoFocus'];
    disabled?: React.InputHTMLAttributes<HTMLInputElement>['disabled'];
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
    name?: React.InputHTMLAttributes<HTMLInputElement>['name'];
    required?: React.InputHTMLAttributes<HTMLInputElement>['required'];
    autoCapitalize?: React.InputHTMLAttributes<
        HTMLInputElement
    >['autoCapitalize'];
    error?: boolean;
    helperText?: string;
}

export const TextField: React.SFC<TextFieldProps> = props => {
    return (
        <div>
            <input
                id={props.id}
                name={props.name}
                required={props.required}
                className={classNames(
                    'TextField',
                    'width-100',
                    props.className,
                    {
                        'TextField--error': props.error,
                    },
                )}
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
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
            {props.helperText ? (
                <Fragment>
                    <LineSpacer size='xxsmall' />
                    <Typography error className='text-center' variant='body2'>
                        {props.helperText}
                    </Typography>
                </Fragment>
            ) : (
                undefined
            )}
        </div>
    );
};
