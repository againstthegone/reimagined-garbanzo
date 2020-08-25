import { Covid19EventType } from '../Covid19/Covid19EventType';
import { Covid19State } from '../Covid19/Covid19State';
import { LowerTierLocalAuthorityAreaName } from '../CoronovirusDataGovUkApi/LowerTierLocalAuthorityAreaName';
import { AreaDataStatus } from './AreaDataStatus';

export class AreaDataRejectedEvent {
    readonly type = Covid19EventType.AREA_DATA_REJECTED;
    readonly area: LowerTierLocalAuthorityAreaName;

    constructor(area: LowerTierLocalAuthorityAreaName) {
        this.area = area;
    }
}

export const handleAreaDataRejectedEvent = (state: Covid19State, event: AreaDataRejectedEvent): Covid19State => {
    return {
        ...state,
        data: {
            ...state.data,
            [event.area]: {
                status: AreaDataStatus.ERROR,
            },
        },
    };
}