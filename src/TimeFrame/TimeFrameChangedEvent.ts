import { Covid19EventType } from '../Covid19/Covid19EventType';
import { Covid19State } from '../Covid19/Covid19State';

export class TimeFrameChangedEvent {
    readonly type = Covid19EventType.TIME_FRAME_CHANGED;
    readonly timeFrame: number;

    constructor(timeFrame: number) {
        this.timeFrame = timeFrame;
    }
}

export const handleTimeFrameChangedEvent = (state: Covid19State, event: TimeFrameChangedEvent): Covid19State => {
    return {
        ...state,
        timeFrame: event.timeFrame,
    };
}