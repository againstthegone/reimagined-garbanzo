import { reduce, DataStatus, DataRequestedEvent, DataRejectedEvent, DataResolvedEvent, TimeFrameChangedEvent } from "./AppReducer";
import { LowerTierLocalAuthorityAreaName } from "./LowerTierLocalAuthority";

describe('AppReducer', () => {
    describe('reduce', () => {
        it('creates an initial state with a timeframe and no data', () => {
            expect(reduce()).toEqual({
                data: {},
                timeFrame: 0,
            });
        });

        it('marks a location as fetching when reducing a DataRequested event', () => {
            const state = {
                data: {
                    [LowerTierLocalAuthorityAreaName.Bolton]: {
                        status: DataStatus.COMPLETE,
                        data: [],
                    },
                },
                timeFrame: 0,
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
                data: {
                    [LowerTierLocalAuthorityAreaName.Trafford]: {
                        status: DataStatus.FETCHING,
                    },
                },
                timeFrame: 0,
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
                data: {
                    [LowerTierLocalAuthorityAreaName.Manchester]: {
                        status: DataStatus.ERROR,
                    },
                    [LowerTierLocalAuthorityAreaName.Wigan]: {
                        status: DataStatus.FETCHING,
                    },
                },
                timeFrame: 0,
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

        it('updates the time frame when changed', () => {
            const state = {
                data: {},
                timeFrame: 1,
            };

            expect(reduce(state, new TimeFrameChangedEvent(3))).toEqual({
                ...state,
                timeFrame: 3,
            });
        });
    });
});