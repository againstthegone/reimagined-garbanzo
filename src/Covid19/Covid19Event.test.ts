import * as AreaDataRequestedEvent from '../AreaData/AreaDataRequestedEvent';
import * as AreaDataRejectedEvent from '../AreaData/AreaDataRejectedEvent';
import * as AreaDataResolvedEvent from '../AreaData/AreaDataResolvedEvent';
import * as TimeFrameChangedEvent from '../TimeFrame/TimeFrameChangedEvent';
import { LowerTierLocalAuthorityAreaName } from '../LowerTierLocalAuthorityAreaName';
import { handleCovid19Event } from './Covid19Event';
import { createDefaultCovid19State } from './Covid19State';

describe('Covid19Event', () => {
    describe('handleCovid19Event', () => {

        beforeEach(() => {
            jest.resetAllMocks();
        });

        it('is able to handle an area data requested event', () => {
            const state = createDefaultCovid19State();
            const event = new AreaDataRequestedEvent.AreaDataRequestedEvent(LowerTierLocalAuthorityAreaName.Rochdale);
            const handleAreaDataRequestedEventSpy = jest.spyOn(AreaDataRequestedEvent, 'handleAreaDataRequestedEvent');
            handleCovid19Event(state, event);
            expect(handleAreaDataRequestedEventSpy).toHaveBeenCalledWith(state, event);
        });

        it('is able to handle an area data rejected event', () => {
            const state = createDefaultCovid19State();
            const event = new AreaDataRejectedEvent.AreaDataRejectedEvent(LowerTierLocalAuthorityAreaName.Oldham);
            const handleAreaDataRejectedEventSpy = jest.spyOn(AreaDataRejectedEvent, 'handleAreaDataRejectedEvent');
            handleCovid19Event(state, event);
            expect(handleAreaDataRejectedEventSpy).toHaveBeenCalledWith(state, event);
        });

        it('is able to handle an area data resolved event', () => {
            const state = createDefaultCovid19State();
            const event = new AreaDataResolvedEvent.AreaDataResolvedEvent(LowerTierLocalAuthorityAreaName.Stockport, []);
            const handleAreaDataResolvedEventSpy = jest.spyOn(AreaDataResolvedEvent, 'handleAreaDataResolvedEvent');
            handleCovid19Event(state, event);
            expect(handleAreaDataResolvedEventSpy).toHaveBeenCalledWith(state, event);
        });

        it('is able to handle a time frame changed event', () => {
            const state = createDefaultCovid19State();
            const event = new TimeFrameChangedEvent.TimeFrameChangedEvent(1);
            const handleTimeFrameChangedEventSpy = jest.spyOn(TimeFrameChangedEvent, 'handleTimeFrameChangedEvent');
            handleCovid19Event(state, event);
            expect(handleTimeFrameChangedEventSpy).toHaveBeenCalledWith(state, event);
        });
    });
});