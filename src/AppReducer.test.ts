import { reduce, DataStatus, DataRequestedEvent, DataRejectedEvent, DataResolvedEvent } from "./AppReducer";
import { LowerTierLocalAuthorityAreaName } from "./LowerTierLocalAuthority";

describe('AppReducer', () => {
    describe('reduce', () => {
        it('creates an initial state with a timeframe and no data', () => {
            expect(reduce()).toEqual({
                timeFrame: 0,
                data: {},
            });
        });

        it('marks a location as fetching when reducing a DataRequested event', () => {
            const state = {
                timeFrame: 0,
                data: {
                    [LowerTierLocalAuthorityAreaName.Bolton]: {
                        status: DataStatus.COMPLETE,
                        data: [],
                    },
                }
            };
            expect(reduce(state, new DataRequestedEvent(LowerTierLocalAuthorityAreaName.Salford))).toEqual({
                ...state,
                data: {
                    ...state.data,
                    [LowerTierLocalAuthorityAreaName.Salford]: {
                        status: DataStatus.FETCHING
                    },
                },
            })
        });

        it('marks a location as error when reducing a DataRejected event', () => {
            const state = {
                timeFrame: 0,
                data: {
                    [LowerTierLocalAuthorityAreaName.Trafford]: {
                        status: DataStatus.FETCHING,
                    },
                },
            };
            expect(reduce(state, new DataRejectedEvent(LowerTierLocalAuthorityAreaName.Trafford))).toEqual({
                ...state,
                data: {
                    [LowerTierLocalAuthorityAreaName.Trafford]: {
                        status: DataStatus.ERROR
                    },
                },
            })
        });

        it('marks a location as complete with data when reducing a DataResolved event', () => {
            const state = {
                timeFrame: 0,
                data: {
                    [LowerTierLocalAuthorityAreaName.Manchester]: {
                        status: DataStatus.ERROR,
                    },
                    [LowerTierLocalAuthorityAreaName.Wigan]: {
                        status: DataStatus.FETCHING,
                    },
                },
            };
            const data = [
                {
                    date: '2020-03-01',
                    newCasesBySpecimenDate: 1,
                },
                {
                    date: '2020-03-02',
                    newCasesBySpecimenDate: 3,
                }
            ];
            expect(reduce(state, new DataResolvedEvent(LowerTierLocalAuthorityAreaName.Wigan, data))).toEqual({
                ...state,
                data: {
                    ...state.data,
                    [LowerTierLocalAuthorityAreaName.Wigan]: {
                        status: DataStatus.COMPLETE,
                        data,
                    },
                },
            })
        });
    });
});