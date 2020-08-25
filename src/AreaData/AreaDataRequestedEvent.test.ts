import { LowerTierLocalAuthorityAreaName } from '../LowerTierLocalAuthorityAreaName';
import { AreaDataRequestedEvent, handleAreaDataRequestedEvent } from './AreaDataRequestedEvent';
import { AreaDataStatus } from './AreaDataStatus';

describe('AreaDataRequestedEvent', () => {
    describe('handleAreaDataRequestedEvent', () => {
        it('marks the location as fetching', () => {
            const state = {
                data: {
                    [LowerTierLocalAuthorityAreaName.Bolton]: {
                        status: AreaDataStatus.COMPLETE,
                        data: [],
                    },
                },
                timeFrame: 0,
            };
            expect(handleAreaDataRequestedEvent(state, new AreaDataRequestedEvent(LowerTierLocalAuthorityAreaName.Salford))).toEqual({
                ...state,
                data: {
                    ...state.data,
                    [LowerTierLocalAuthorityAreaName.Salford]: {
                        status: AreaDataStatus.FETCHING
                    },
                },
            });
        });
    });
})