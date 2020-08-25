import { LowerTierLocalAuthorityAreaName } from '../CoronovirusDataGovUkApi/LowerTierLocalAuthorityAreaName';
import { AreaDataRejectedEvent, handleAreaDataRejectedEvent } from './AreaDataRejectedEvent';
import { AreaDataStatus } from './AreaDataStatus';

describe('AreaDataRequestedEvent', () => {
    describe('handleAreaDataRequestedEvent', () => {
        it('marks the location with error', () => {
            const state = {
                data: {
                    [LowerTierLocalAuthorityAreaName.Trafford]: {
                        status: AreaDataStatus.FETCHING,
                    },
                },
                timeFrame: 0,
            };
            expect(handleAreaDataRejectedEvent(state, new AreaDataRejectedEvent(LowerTierLocalAuthorityAreaName.Trafford))).toEqual({
                ...state,
                data: {
                    [LowerTierLocalAuthorityAreaName.Trafford]: {
                        status: AreaDataStatus.ERROR
                    },
                },
            });
        });
    });
})