import { AreaDataRejectedEvent, handleAreaDataRejectedEvent } from '../AreaData/AreaDataRejectedEvent';
import { AreaDataRequestedEvent, handleAreaDataRequestedEvent } from '../AreaData/AreaDataRequestedEvent';
import { AreaDataResolvedEvent, handleAreaDataResolvedEvent } from '../AreaData/AreaDataResolvedEvent';
import { handleTimeFrameChangedEvent, TimeFrameChangedEvent } from '../TimeFrame/TimeFrameChangedEvent';
import { Covid19EventType } from './Covid19EventType';
import { createDefaultCovid19State, Covid19State } from './Covid19State';

export type Covid19Event =
    TimeFrameChangedEvent |
    AreaDataRequestedEvent |
    AreaDataResolvedEvent |
    AreaDataRejectedEvent;

export const handleCovid19Event = (state = createDefaultCovid19State(), event?: Covid19Event): Covid19State => {
    if (event === undefined) {
        return state;
    }

    switch (event.type) {
        case Covid19EventType.AREA_DATA_REQUESTED: return handleAreaDataRequestedEvent(state, event);
        case Covid19EventType.AREA_DATA_REJECTED: return handleAreaDataRejectedEvent(state, event);
        case Covid19EventType.AREA_DATA_RESOLVED: return handleAreaDataResolvedEvent(state, event);
        case Covid19EventType.TIME_FRAME_CHANGED: return handleTimeFrameChangedEvent(state, event);
        default: return state;
    };
}