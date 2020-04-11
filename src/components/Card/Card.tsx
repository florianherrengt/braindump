import classNames from 'classnames';
import React, { useState } from 'react';
import { CardActionButton } from './CardActionButton';
import {
    CardActionsContainer,
    CardActionsContainerProps,
} from './CardActionsContainer';

export interface CardProps {
    className?: string;
    actions?: CardActionsContainerProps['actions'];
    actionOpen?: boolean;
}

export const Card: React.SFC<CardProps> = props => {
    const [actionOpen, setActionOpen] = useState(props.actionOpen || false);
    return (
        <div className={classNames(['Card', props.className])}>
            {props.actions ? (
                <CardActionButton
                    open={actionOpen}
                    onClick={() => setActionOpen(!actionOpen)}
                />
            ) : null}
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
