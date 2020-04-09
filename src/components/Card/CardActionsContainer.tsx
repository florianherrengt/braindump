import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../Button';
import { Variant } from '../../config/theme';
import { useClickAway } from '@umijs/hooks';

interface CardActionsContainerProps {
    onClose?(): void;
}

export const CardActionsContainer: React.SFC<CardActionsContainerProps> = props => {
    const ref = useClickAway(() => {
        props.onClose && props.onClose();
    });
    return (
        <div ref={ref} className='Card_Actions_Container'>
            {props.children}
        </div>
    );
};
