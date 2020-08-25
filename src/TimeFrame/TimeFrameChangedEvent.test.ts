import { handleTimeFrameChangedEvent, TimeFrameChangedEvent } from './TimeFrameChangedEvent';

describe('TimeFrameChangedEvent', () => {
    describe('handleTimeFrameChangedEvent', () => {
        it('updates the time frame when changed', () => {
            const state = {
                data: {},
                timeFrame: 1,
            };

            expect(handleTimeFrameChangedEvent(state, new TimeFrameChangedEvent(3))).toEqual({
                ...state,
                timeFrame: 3,
            });
        });
    });
});


