import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import { TimeFrameControl } from './TimeFrameControl';
import { TimeFrameChangedEvent } from './TimeFrame/TimeFrameChangedEvent';

describe('TimeFrameControl', () => {

    it('renders an input range', () => {
        render(<TimeFrameControl/>);
        const input = screen.getByLabelText('input-range');
        expect(input.getAttribute('type')).toEqual('range');
    });

//     it('triggers a time frame changed event on input changed', () => {
//         const mockDispatch = jest.fn();
//         render(<TimeFrameControl dispatch={mockDispatch}/>);
//         const input = screen.getByLabelText('input-range');
//         fireEvent.input(input, { target: { value: 3 }});
//         expect(mockDispatch).toHaveBeenCalledWith(new TimeFrameChangedEvent(3));
//     })
});