import { LowerTierLocalAuthorityAreaName } from '../LowerTierLocalAuthorityAreaName';
import { AreaDataResolvedEvent, handleAreaDataResolvedEvent } from './AreaDataResolvedEvent';
import { AreaDataStatus } from './AreaDataStatus';

describe('AreaDataRequestedEvent', () => {
    describe('handleAreaDataRequestedEvent', () => {
        it('stores the data against the location and marks as complete', () => {
            const state = {
                data: {
                    [LowerTierLocalAuthorityAreaName.Manchester]: {
                        status: AreaDataStatus.ERROR,
                    },
                    [LowerTierLocalAuthorityAreaName.Wigan]: {
                        status: AreaDataStatus.FETCHING,
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
            expect(handleAreaDataResolvedEvent(state, new AreaDataResolvedEvent(LowerTierLocalAuthorityAreaName.Wigan, data))).toEqual({
                ...state,
                data: {
                    ...state.data,
                    [LowerTierLocalAuthorityAreaName.Wigan]: {
                        status: AreaDataStatus.COMPLETE,
                        data,
                    },
                },
            });
        });
    });
})