import { Button } from '../Button';
import { TextField } from '../TextField';
import { Typography } from '../Typography';
import React, { useEffect, useRef, useState, FormEvent } from 'react';

import { routerUri } from '../../config/routerUri';
import { LineSpacer } from '../LineSpacer';
import { i18n } from '../../i18n';
import { useFormik, FormikErrors } from 'formik';

interface SignUpProps {
    usernameExists: boolean;
    loading: boolean;
    onUsernameChange(username: string): void;
    onSubmit(input: { username: string; password: string }): void;
}

interface FormValues {
    username: string;
    password: string;
    passwordConfirm: string;
}

export const SignUp = (props: SignUpProps) => {
    const initialValues: FormValues = {
        username: '',
        password: '',
        passwordConfirm: '',
    };

    const formik = useFormik({
        initialValues,
        validateOnBlur: true,
        validate(values) {
            const errors: FormikErrors<FormValues> = {};
            if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = i18n.text.passwordConfirmNoMatch;
            }
            return errors;
        },
        onSubmit(values, { setSubmitting }) {
            props.onSubmit(values);
            setSubmitting(false);
        },
    });

    return (
        <div className='SignUp'>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        required
                        name='username'
                        ariaLabel='username'
                        autoComplete='off'
                        autoCapitalize='none'
                        className='SignUp_TextField_Username width-100'
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        error={props.usernameExists}
                        helperText={
                            props.usernameExists
                                ? 'Username already exists'
                                : undefined
                        }
                        placeholder={i18n.text.username}
                    />
                </div>
                <LineSpacer />
                <div>
                    <TextField
                        required
                        name='password'
                        ariaLabel='password field'
                        autoComplete='password'
                        className='SignUp_TextField_Password width-100'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder={i18n.text.password}
                        type='password'
                    />
                </div>
                <LineSpacer />
                <div>
                    <TextField
                        required
                        name='passwordConfirm'
                        ariaLabel='password field'
                        autoComplete='password'
                        className='SignUp_TextField_Password width-100'
                        onChange={formik.handleChange}
                        value={formik.values.passwordConfirm}
                        placeholder={i18n.text.passwordConfirm}
                        type='password'
                    />
                </div>
                <LineSpacer />
                <Button
                    ariaLabel='create new account button'
                    className='SignUp_Button_Submit width-100'
                    type='submit'
                >
                    Sign Up
                </Button>
                {/* <LineSpacer />
                <div className='text-center'>
                    <Typography variant='body2'>
                        By creating an account, you are agreeing to our{' '}
                        <Link to={routerUri.termAndConditions}>
                            Terms of Service
                        </Link>{' '}
                        and <Link to={routerUri.privacy}>Privacy Policy</Link>.
                    </Typography>
                    <LineSpacer />
                    <Typography variant='body2'>
                        Already have an account?
                    </Typography>
                    <Typography variant='body2'>
                        <Link to={routerUri.signIn}>Sign in</Link>
                    </Typography>
                </div> */}
            </form>
        </div>
    );
};
