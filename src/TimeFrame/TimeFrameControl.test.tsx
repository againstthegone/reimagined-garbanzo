import React, { Dispatch } from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import { TimeFrameControl } from './TimeFrameControl';
import { TimeFrameChangedEvent } from './TimeFrameChangedEvent';
import { useCovid19Dispatch } from '../Covid19/Covid19Context';
import { Covid19Event } from '../Covid19/Covid19Event';

jest.mock('../Covid19/Covid19Context');

describe('TimeFrameControl', () => {

    const mockCovid19Dispatch = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
        (useCovid19Dispatch as jest.Mock<Dispatch<Covid19Event>>).mockReturnValue(mockCovid19Dispatch);
    });

    it('renders an input range', () => {
        render(<TimeFrameControl/>);
        const input = screen.getByLabelText('input-range');
        expect(input.getAttribute('type')).toEqual('range');
    });

    it('triggers a time frame changed event on input changed', () => {
        render(<TimeFrameControl />);
        const input = screen.getByLabelText('input-range');
        fireEvent.input(input, { target: { value: 3 }});
        expect(mockCovid19Dispatch).toHaveBeenCalledWith(new TimeFrameChangedEvent(3));
    })
});