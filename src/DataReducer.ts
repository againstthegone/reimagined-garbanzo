import { LowerTierLocalAuthorityAreaName } from "./LowerTierLocalAuthority";

export enum DataStatus {
    FETCHING,
    COMPLETE,
    ERROR,
};

export interface DataState {
    [key: string]: {
        status: DataStatus
        data: {
            date: string;
            newCasesBySpecimenDate: number;
        }[];
    };
}

export enum DataActionType {
    REQUESTED,
    REJECTED,
    RESOLVED,
}

export interface HasDataActionType {
    type: DataActionType
}

export const reduce = (state = {}, action?: DataRequested | DataResolved | DataRejected): DataState => {
    if (action === undefined) {
        return state;
    }

    switch (action.type) {

    }
    return state;
}

export class DataRequested {
    readonly type = DataActionType.REQUESTED;
    readonly area: LowerTierLocalAuthorityAreaName;

    constructor(area: LowerTierLocalAuthorityAreaName) {
        this.area = area;
    }
}

export class DataRejected {
    readonly type = DataActionType.REJECTED;
    readonly area: LowerTierLocalAuthorityAreaName;

    constructor(area: LowerTierLocalAuthorityAreaName) {
        this.area = area;
    }
}

export class DataResolved {
    readonly type = DataActionType.RESOLVED;
    readonly area: LowerTierLocalAuthorityAreaName;

    constructor(area: LowerTierLocalAuthorityAreaName) {
        this.area = area;
    }
}