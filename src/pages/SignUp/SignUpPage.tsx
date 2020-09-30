import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignUp } from '../../components';
import { LineSpacer } from '../../components/LineSpacer';
import { signUp } from '../../redux/actions';

export const SignUpPage = () => {
    const [usernameExists, setUsernameExists] = useState(false);
    const dispatch = useDispatch();
    return (
        <div className='SignUpPage'>
            <LineSpacer />
            <SignUp
                loading={false}
                usernameExists={usernameExists}
                onUsernameChange={username => {
                    setUsernameExists(false);
                }}
                onSubmit={input => {
                    dispatch(signUp(input));
                }}
            />
        </div>
    );
};
