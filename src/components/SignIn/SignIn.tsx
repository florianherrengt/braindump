import React, { useState } from 'react';
import { routerUri } from '../../config';
import { Button } from '../Button';
import { LineSpacer } from '../LineSpacer';
import { TextField } from '../TextField';
import { Typography } from '../Typography';

interface SignInProps {
    error?: string;
    loading: boolean;
    onCreateAccountClick(): void;
    onSubmit(input: { username: string; password: string }): void;
}

export const SignIn = (props: SignInProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    return (
        <div className='SignIn'>
            <form
                onSubmit={event => {
                    event.preventDefault();
                    props.onSubmit({ username, password });
                }}
            >
                <div>
                    <TextField
                        placeholder='Username'
                        ariaLabel='username'
                        autoComplete='off'
                        autoCapitalize='none'
                        className='SignIn_TextField_Username width-100'
                        autoFocus
                        disabled={props.loading}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <LineSpacer />
                <div>
                    <TextField
                        placeholder='Password'
                        ariaLabel='Password'
                        autoComplete='password'
                        className='SignIn_TextField_Password width-100'
                        disabled={props.loading}
                        onChange={event => setPassword(event.target.value)}
                        type='password'
                    />
                </div>
                <LineSpacer />
                <Button
                    ariaLabel='submit sign in form'
                    className='SignIn_Button_Submit width-100'
                    disabled={props.loading}
                    type='submit'
                >
                    Sign In
                </Button>
                {props.error && (
                    <div>
                        <LineSpacer />
                        <Typography className='text-center text-error'>
                            {props.error}
                        </Typography>
                    </div>
                )}
                <LineSpacer />
                <div className='text-center'>
                    <Typography variant='body2'>
                        Don't have an account yet?
                    </Typography>
                    <LineSpacer size='xsmall' />
                    <Typography variant='body2'>
                        <a
                            className='bold'
                            href={routerUri.signUp}
                            onClick={props.onCreateAccountClick}
                        >
                            Create account
                        </a>
                    </Typography>
                </div>
            </form>
        </div>
    );
};
