import { NewCasesBySpecimanDateDatum } from "./CoronovirusDataGovUkApi/DataApi";
import { LowerTierLocalAuthorityAreaName } from "./LowerTierLocalAuthority";

export interface AppState {
    timeFrame: number;
    data: {
        [key: string]: {
            status: DataStatus;
            data?: NewCasesBySpecimanDateDatum[];
        };
    };
}

export enum AppEventType {
    DATA_REQUESTED,
    DATA_REJECTED,
    DATA_RESOLVED,
    TIME_FRAME_CHANGED,
}

type AppEvent = TimeFrameChangedEvent | DataRequestedEvent | DataResolvedEvent | DataRejectedEvent;

const INITIAL_STATE: AppState = {
    data: {},
    timeFrame: 0,
};

export const reduce = (state = INITIAL_STATE, event?: AppEvent): AppState => {
    if (event === undefined) {
        return state;
    }

    switch (event.type) {
        case AppEventType.DATA_REQUESTED: return handleDataRequestedEvent(state, event);
        case AppEventType.DATA_REJECTED: return handleDataRejectedEvent(state, event);
        case AppEventType.DATA_RESOLVED: return handleDataResolvedEvent(state, event);
        case AppEventType.TIME_FRAME_CHANGED: return handleTimeFrameChangedEvent(state, event);
        default: return state;
    };
}

export enum DataStatus {
    FETCHING,
    COMPLETE,
    ERROR,
};

export class DataRequestedEvent {
    readonly type = AppEventType.DATA_REQUESTED;
    readonly area: LowerTierLocalAuthorityAreaName;

    constructor(area: LowerTierLocalAuthorityAreaName) {
        this.area = area;
    }
}

function handleDataRequestedEvent(state: AppState, event: DataRequestedEvent): AppState {
    return {
        ...state,
        data: {
            ...state.data,
            [event.area]: {
                status: DataStatus.FETCHING,
            },
        },
    };
}

export class DataRejectedEvent {
    readonly type = AppEventType.DATA_REJECTED;
    readonly area: LowerTierLocalAuthorityAreaName;

    constructor(area: LowerTierLocalAuthorityAreaName) {
        this.area = area;
    }
}

function handleDataRejectedEvent(state: AppState, event: DataRejectedEvent): AppState {
    return {
        ...state,
        data: {
            ...state.data,
            [event.area]: {
                status: DataStatus.ERROR,
            },
        },
    };
}

export class DataResolvedEvent {
    readonly type = AppEventType.DATA_RESOLVED;
    readonly area: LowerTierLocalAuthorityAreaName;
    readonly data: NewCasesBySpecimanDateDatum[];

    constructor(area: LowerTierLocalAuthorityAreaName, data: NewCasesBySpecimanDateDatum[]) {
        this.area = area;
        this.data = data;
    }
}

function handleDataResolvedEvent(state: AppState, event: DataResolvedEvent): AppState {
    return {
        ...state,
        data: {
            ...state.data,
            [event.area]: {
                status: DataStatus.COMPLETE,
                data: event.data,
            },
        },
    };
}

export class TimeFrameChangedEvent {
    readonly type = AppEventType.TIME_FRAME_CHANGED;
    readonly timeFrame: number;

    constructor(timeFrame: number) {
        this.timeFrame = timeFrame;
    }
}

function handleTimeFrameChangedEvent(state: AppState, event: TimeFrameChangedEvent) {
    return {
        ...state,
        timeFrame: event.timeFrame,
    };
}