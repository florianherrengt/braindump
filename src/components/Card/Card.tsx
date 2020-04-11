import React, { useState } from 'react';
import { CardActionButton } from './CardActionButton';
import {
    CardActionsContainer,
    CardActionsContainerProps,
} from './CardActionsContainer';

export interface CardProps {
    actions?: CardActionsContainerProps['actions'];
    actionOpen?: boolean;
}

export const Card: React.SFC<CardProps> = props => {
    const [actionOpen, setActionOpen] = useState(props.actionOpen || false);
    return (
        <div className='Card'>
            <CardActionButton
                open={actionOpen}
                onClick={() => setActionOpen(!actionOpen)}
            />
            {actionOpen && props.actions ? (
                <CardActionsContainer
                    actions={props.actions}
                    onClose={() => setActionOpen(false)}
                >
                    {props.actions}
                </CardActionsContainer>
            ) : null}
            {props.children}
        </div>
    );
};
