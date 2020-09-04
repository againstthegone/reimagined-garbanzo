import { useEffect } from 'react';
import { getLowerTierLocalAuthorityNewCasesBySpecimanDate } from '../CoronovirusDataGovUkApi/DataApi';
import { LowerTierLocalAuthorityAreaName } from '../CoronovirusDataGovUkApi/LowerTierLocalAuthorityAreaName';
import { useCovid19Dispatch, useCovid19State } from '../Covid19/Covid19Context';
import { AreaDataRejectedEvent } from './AreaDataRejectedEvent';
import { AreaDataRequestedEvent } from './AreaDataRequestedEvent';
import { AreaDataResolvedEvent } from './AreaDataResolvedEvent';
import { AreaDataStatus } from './AreaDataStatus';

export const useCovid19AreaData = (area: LowerTierLocalAuthorityAreaName) => {
    const covid19Dispatch = useCovid19Dispatch();
    const covid19State = useCovid19State();

    useEffect(() => {
        covid19Dispatch(new AreaDataRequestedEvent(area));
        (async function () {
            try {
                const data = await getLowerTierLocalAuthorityNewCasesBySpecimanDate(area);
                covid19Dispatch(new AreaDataResolvedEvent(area, data));
            }
            catch (e: unknown) {
                covid19Dispatch(new AreaDataRejectedEvent(area));
            }
        })();
    }, [area, covid19Dispatch]);

    return {
        status: covid19State.data[area]?.status || AreaDataStatus.FETCHING,
        data: covid19State.data[area]?.data || [],
    };
}