import React, { ChangeEvent } from 'react';
import { useCovid19Dispatch } from '../Covid19/Covid19Context';
import { TimeFrameChangedEvent } from './TimeFrameChangedEvent';
import { useTimeFrame } from './useTimeFrame';

const MILLIS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const BASE_DATE_TIME = Date.UTC(2020, 2, 1);

const MILLIS_PER_DAY = MILLIS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY;

export const TimeFrameControl = () => {

    const dispatch = useCovid19Dispatch();
    const timeFrame = useTimeFrame();
    const daysSinceBaseDate = Math.floor((Date.now() - BASE_DATE_TIME) / MILLIS_PER_DAY);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(new TimeFrameChangedEvent(parseInt(e.target.value)));
    };

    return (<div className='time-frame-control'>
        <div>{new Date(BASE_DATE_TIME + (timeFrame * MILLIS_PER_DAY)).toISOString().substring(0, 10)}</div>
        <input type='range' aria-label='input-range' onChange={onChange} value={timeFrame} min='0' max={daysSinceBaseDate} />
    </div>);
}