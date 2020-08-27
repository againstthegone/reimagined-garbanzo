import React from 'react';
import { LowerTierLocalAuthorityAreaName } from '../CoronovirusDataGovUkApi/LowerTierLocalAuthorityAreaName';
import { NewCasesBySpecimenDateDataNode } from './NewCasesBySpecimenDateDataNode';
import { NoDataNode } from './NoDataNode';

export const GreaterManchesterNodeCanvas = () => {
    return (<div className='node-canvas'>
        <div className='node-row'>
            <NoDataNode />
        </div>
        <div className='node-row'>
            <NewCasesBySpecimenDateDataNode area={LowerTierLocalAuthorityAreaName.Bolton} />
            <NewCasesBySpecimenDateDataNode area={LowerTierLocalAuthorityAreaName.Rochdale} />
            <NoDataNode />
        </div>
        <div className='node-row'>
            <NewCasesBySpecimenDateDataNode area={LowerTierLocalAuthorityAreaName.Wigan} />
            <NewCasesBySpecimenDateDataNode area={LowerTierLocalAuthorityAreaName.Bury} />
            <NoDataNode />
        </div>
        <div className='node-row'>
            <NewCasesBySpecimenDateDataNode area={LowerTierLocalAuthorityAreaName.Salford} />
            <NewCasesBySpecimenDateDataNode area={LowerTierLocalAuthorityAreaName.Oldham} />
            <NoDataNode />
        </div>
        <div className='node-row'>
            <NoDataNode />
            <NewCasesBySpecimenDateDataNode area={LowerTierLocalAuthorityAreaName.Manchester} />
            <NewCasesBySpecimenDateDataNode area={LowerTierLocalAuthorityAreaName.Tameside} />
        </div>
        <div className='node-row'>
            <NewCasesBySpecimenDateDataNode area={LowerTierLocalAuthorityAreaName.Trafford} />
            <NewCasesBySpecimenDateDataNode area={LowerTierLocalAuthorityAreaName.Stockport} />
            <NoDataNode />
        </div>
        <div className='node-row'>
            <NoDataNode />
        </div>
    </div>);
};
