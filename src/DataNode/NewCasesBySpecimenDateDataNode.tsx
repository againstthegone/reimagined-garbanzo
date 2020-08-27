import React from 'react';
import { Node } from './Node';
import { LowerTierLocalAuthorityAreaName } from '../CoronovirusDataGovUkApi/LowerTierLocalAuthorityAreaName';

interface NewCasesBySpecimenDateDataNodeProps {
    area: LowerTierLocalAuthorityAreaName;
}

export const NewCasesBySpecimenDateDataNode = ({ area }: NewCasesBySpecimenDateDataNodeProps) => {
    return (<Node backgroundColor='cyan'/>)
};