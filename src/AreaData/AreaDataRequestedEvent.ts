import { Covid19EventType } from '../Covid19/Covid19EventType';
import { Covid19State } from '../Covid19/Covid19State';
import { LowerTierLocalAuthorityAreaName } from '../LowerTierLocalAuthorityAreaName';
import { AreaDataStatus } from './AreaDataStatus';

export class AreaDataRequestedEvent {
    readonly type = Covid19EventType.AREA_DATA_REQUESTED;
    readonly area: LowerTierLocalAuthorityAreaName;

    constructor(area: LowerTierLocalAuthorityAreaName) {
        this.area = area;
    }
}

export const handleAreaDataRequestedEvent = (state: Covid19State, event: AreaDataRequestedEvent): Covid19State => {
    return {
        ...state,
        data: {
            ...state.data,
            [event.area]: {
                status: AreaDataStatus.FETCHING,
            },
        },
    };
}