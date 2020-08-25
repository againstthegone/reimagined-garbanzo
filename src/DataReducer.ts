import { NewCasesBySpecimanDateDatum } from "./CoronovirusDataGovUkApi/DataApi";
import { LowerTierLocalAuthorityAreaName } from "./LowerTierLocalAuthority";

export enum DataStatus {
    FETCHING,
    COMPLETE,
    ERROR,
};

export interface DataState {
    [key: string]: {
        status: DataStatus;
        data?: NewCasesBySpecimanDateDatum[];
    };
}
export enum DataEventType {
    REQUESTED,
    REJECTED,
    RESOLVED,
}

export interface HasDataActionType {
    type: DataEventType
}

export const reduce = (state: DataState = {}, event?: DataRequestedEvent | DataResolvedEvent | DataRejectedEvent): DataState => {
    if (event === undefined) {
        return state;
    }

    switch (event.type) {
        case DataEventType.REQUESTED: {
            return {
                ...state,
                [event.area]: {
                    status: DataStatus.FETCHING,
                },
            };
        }
        case DataEventType.REJECTED: {
            return { 
                ...state,
                [event.area]: {
                    status: DataStatus.ERROR,
                },
            };
        }
        case DataEventType.RESOLVED: {
            return { 
                ...state,
                [event.area]: {
                    status: DataStatus.COMPLETE,
                    data: event.data,
                },
            };
        }
        default: {
            return state;
        }
    };
}

export class DataRequestedEvent {
    readonly type = DataEventType.REQUESTED;
    readonly area: LowerTierLocalAuthorityAreaName;

    constructor(area: LowerTierLocalAuthorityAreaName) {
        this.area = area;
    }
}

export class DataRejectedEvent {
    readonly type = DataEventType.REJECTED;
    readonly area: LowerTierLocalAuthorityAreaName;

    constructor(area: LowerTierLocalAuthorityAreaName) {
        this.area = area;
    }
}

export class DataResolvedEvent {
    readonly type = DataEventType.RESOLVED;
    readonly area: LowerTierLocalAuthorityAreaName;
    readonly data: NewCasesBySpecimanDateDatum[];

    constructor(area: LowerTierLocalAuthorityAreaName, data: NewCasesBySpecimanDateDatum[]) {
        this.area = area;
        this.data = data;
    }
}