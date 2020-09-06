import React, { useMemo } from 'react';
import { Node } from './Node';
import { LowerTierLocalAuthorityAreaName } from '../CoronovirusDataGovUkApi/LowerTierLocalAuthorityAreaName';
import { AreaDataStatus } from '../AreaData/AreaDataStatus';
import { useTimeFrame } from '../TimeFrame/useTimeFrame';
import { useCovid19AreaData } from '../AreaData/Covid19AreaData';
import { BASE_DATE_TIME, MILLIS_PER_DAY } from '../TimeFrame/TimeFrameControl';

interface NewCasesBySpecimenDateDataNodeProps {
    area: LowerTierLocalAuthorityAreaName;
}

export const NewCasesBySpecimenDateDataNode = ({ area }: NewCasesBySpecimenDateDataNodeProps) => {
    const { status, data } = useCovid19AreaData(area);
    const timeFrame = useTimeFrame();

    const datum = useMemo(() => {
        const date = new Date(BASE_DATE_TIME + (timeFrame * MILLIS_PER_DAY)).toISOString().substring(0, 10);
        return data.find(d => d.date === date)?.newCasesBySpecimenDate;
    }, [data, timeFrame]);

    const color = useMemo(() => {
        if (status === AreaDataStatus.FETCHING) {
            return '#eef';
        } else if (status === AreaDataStatus.ERROR) {
            return '#fee';
        } else if (datum === undefined) {
            return '#eee';
        }
        else {
            return `rgb(255, ${Math.max(0, 255 - (datum ^ 4))}, ${Math.max(0, 255 - (datum ^ 4))})`;
        }
    }, [status, datum])

return (<Node backgroundColor={color} area={area} datum={datum}/>)
};