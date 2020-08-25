import { reduce, DataStatus, DataRequestedEvent } from "./DataReducer";
import { LowerTierLocalAuthorityAreaName } from "./LowerTierLocalAuthority";

describe('AppReducer', () => {
    describe('reduce', () => {
        it('creates an initial state with no data', () => {
            expect(reduce()).toEqual({});
        });

        it('marks a location as fetching when reducing a DataRequested event', () => {
            const state = {
                Bolton: {
                    status: DataStatus.COMPLETE,
                    data: [],
                },
            }
            expect(reduce(state, new DataRequestedEvent(LowerTierLocalAuthorityAreaName.Salford))).toEqual({
                ...state,
                [LowerTierLocalAuthorityAreaName.Salford]: {
                    status: DataStatus.FETCHING
                },
            })
        });

    });
});