import React from 'react';

interface LineSpacerProps {
    onClick?(): void;
}

export const LineSpacer: React.SFC<LineSpacerProps> = props => {
    return <div className='LineSpacer' />;
};
