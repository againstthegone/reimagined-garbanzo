import React, { useMemo } from 'react';
import { Node } from './Node';
import { LowerTierLocalAuthorityAreaName } from '../CoronovirusDataGovUkApi/LowerTierLocalAuthorityAreaName';
import { AreaDataStatus } from '../AreaData/AreaDataStatus';
import { useTimeFrame } from '../TimeFrame/useTimeFrame';
import { useCovid19AreaData } from '../AreaData/Covid19AreaData';

interface NewCasesBySpecimenDateDataNodeProps {
    area: LowerTierLocalAuthorityAreaName;
}

export const NewCasesBySpecimenDateDataNode = ({ area }: NewCasesBySpecimenDateDataNodeProps) => {
    const { status, data } = useCovid19AreaData(area);
    const timeFrame = useTimeFrame();

    const color = useMemo(() => {
        if (status === AreaDataStatus.FETCHING) {
            return '#eef';
        } else if (status === AreaDataStatus.ERROR) {
            return '#fee';
        } else if (!!!data || timeFrame >= data.length) {
            return '#eee';
        } else {
            return `rgb(${Math.max(0, 255 - (data[timeFrame].newCasesBySpecimenDate ^ 3))}, 255, 255)`;
        }
    }, [status, data, timeFrame])

    return (<Node backgroundColor={color} area={area} />)
};