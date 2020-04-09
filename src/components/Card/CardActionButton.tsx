import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../Button';
import { Variant } from '../../config/theme';

interface CardActionButtonProps {
    onClick?(): void;
    open?: boolean;
}

export const CardActionButton: React.SFC<CardActionButtonProps> = props => {
    return (
        <Button
            className='Card_Actions_Button_Open'
            onClick={() => {
                props.onClick && props.onClick();
            }}
            variant={Variant.tertiary}
        >
            <i className='material-icons'>
                {props.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </i>
        </Button>
    );
};
