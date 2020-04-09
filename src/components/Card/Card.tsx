import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../Button';
import { Variant } from '../../config/theme';
import { CardActionButton } from './CardActionButton';
import { CardActionsContainer } from './CardActionsContainer';

interface CardProps {
    actions?: React.ReactNode;
    actionOpen?: boolean;
}

const ActionButton: React.SFC<{}> = () => {
    const [open, setOpen] = useState(false);
    return (
        <Button variant={Variant.tertiary}>
            <i className='material-icons'>
                {open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </i>
        </Button>
    );
};

export const Card: React.SFC<CardProps> = props => {
    const [actionOpen, setActionOpen] = useState(props.actionOpen || false);
    return (
        <div className='Card'>
            <CardActionButton
                open={actionOpen}
                onClick={() => setActionOpen(!actionOpen)}
            />
            {actionOpen ? (
                <CardActionsContainer onClose={() => setActionOpen(false)}>
                    {props.actions}
                </CardActionsContainer>
            ) : null}
            {props.children}
        </div>
    );
};
