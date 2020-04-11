import { useClickAway } from '@umijs/hooks';
import React from 'react';
import { Variant } from '../../config/theme';
import { Button } from '../Button';

interface Action {
    label: string;
    icon: string;
    onClick(): void;
}

export interface CardActionsContainerProps {
    onClose?(): void;
    actions: Action[];
}

export const CardActionsContainer: React.SFC<CardActionsContainerProps> = props => {
    const ref = useClickAway(() => {
        props.onClose && props.onClose();
    });
    return (
        <div ref={ref} className='Card_Actions_Container'>
            {/* {props.children} */}
            <ul>
                {props.actions.map(action => (
                    <li>
                        <Button
                            ariaLabel='acton'
                            variant={Variant.tertiary}
                            className='flex'
                            onClick={action.onClick}
                        >
                            <i className='material-icons'>{action.icon}</i>
                            {action.label}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
