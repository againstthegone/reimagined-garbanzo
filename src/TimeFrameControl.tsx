import React, { ChangeEvent, Dispatch } from 'react';
import { TimeFrameChangedEvent } from './TimeFrame/TimeFrameChangedEvent';

export const TimeFrameControl = () => {
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // if (dispatch) {
        //     dispatch(new TimeFrameChangedEvent(parseInt(e.target.value)));
        // }
    };

    return (<input type='range' aria-label='input-range' onChange={onChange} className='time-frame-control'/>);
}