import React, { CSSProperties } from 'react';

interface CheckBoxProps {
    label?: string;
    className?: string;
    style?: CSSProperties;
    ariaLabel: string;
    checked?: boolean;
}

export const CheckBox: React.SFC<CheckBoxProps> = props => {
    return (
        <div className='CheckBox mt-transparent'>
            <input
                aria-label={props.ariaLabel}
                id={props.ariaLabel}
                type='checkbox'
                checked={props.checked}
            />
            <label htmlFor={props.ariaLabel}>
                <span>{props.label}</span>
            </label>
            <span className='CheckBox_Label'>{props.label}</span>
        </div>
    );
};
