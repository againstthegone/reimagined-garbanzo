import React from 'react';
import { LowerTierLocalAuthorityAreaName } from '../CoronovirusDataGovUkApi/LowerTierLocalAuthorityAreaName';

interface NodeProps {
    backgroundColor?: string;
    area?: LowerTierLocalAuthorityAreaName;
    datum?: number;
}

export const Node = ({ backgroundColor = 'transparent', area, datum }: NodeProps) => {
    return (
        <div className='node'>
            <div className='node-top' style={{ borderBottomColor: backgroundColor }} data-testid='node-top' ></div>
            <div className='node-bottom' style={{ borderTopColor: backgroundColor }} data-testid='node-bottom'></div>
            { (area !== undefined) && (<div className='node-title'>{area}</div>) }
            { (datum !== undefined) && (<div className='node-datum'>{datum}</div>)}
        </div>
    );
}




