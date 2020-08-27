import React from 'react';

interface NodeProps {
    backgroundColor?: string;
}

export const Node = ({ backgroundColor = 'transparent' }: NodeProps) => {
    return (
        <div className='node'>
            <div className='node-text'></div>
            <div className='node-top' style={{ borderBottomColor: backgroundColor }}></div>
            <div className='node-bottom' style={{ borderTopColor: backgroundColor }}></div>
        </div>
    );
}




