import React, { ChangeEvent, Dispatch } from 'react';
import { useCovid19Dispatch } from '../Covid19/Covid19Context';
import { TimeFrameChangedEvent } from './TimeFrameChangedEvent';

export const TimeFrameControl = () => {

    const dispatch = useCovid19Dispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(new TimeFrameChangedEvent(parseInt(e.target.value)));
    };

    return (<input type='range' aria-label='input-range' onChange={onChange} className='time-frame-control' />);
}