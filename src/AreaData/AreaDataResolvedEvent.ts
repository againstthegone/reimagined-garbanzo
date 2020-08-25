import { NewCasesBySpecimenDateDatum } from '../CoronovirusDataGovUkApi/NewCasesBySpecimenDateDatum';
import { Covid19EventType } from '../Covid19/Covid19EventType';
import { Covid19State } from '../Covid19/Covid19State';
import { LowerTierLocalAuthorityAreaName } from '../LowerTierLocalAuthorityAreaName';
import { AreaDataStatus } from './AreaDataStatus';

export class AreaDataResolvedEvent {
    readonly type = Covid19EventType.AREA_DATA_RESOLVED;
    readonly area: LowerTierLocalAuthorityAreaName;
    readonly data: NewCasesBySpecimenDateDatum[];

    constructor(area: LowerTierLocalAuthorityAreaName, data: NewCasesBySpecimenDateDatum[]) {
        this.area = area;
        this.data = data;
    }
}

export const handleAreaDataResolvedEvent = (state: Covid19State, event: AreaDataResolvedEvent): Covid19State => {
    return {
        ...state,
        data: {
            ...state.data,
            [event.area]: {
                status: AreaDataStatus.COMPLETE,
                data: event.data,
            },
        },
    };
}