import React, { Dispatch } from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import { TimeFrameControl } from './TimeFrameControl';
import { TimeFrameChangedEvent } from './TimeFrameChangedEvent';
import { useCovid19Dispatch, useCovid19State } from '../Covid19/Covid19Context';
import { Covid19Event } from '../Covid19/Covid19Event';
import { Covid19State } from '../Covid19/Covid19State';

jest.mock('../Covid19/Covid19Context');

describe('TimeFrameControl', () => {

    const mockCovid19Dispatch = jest.fn();
    const mockCovid19State = { timeFrame: 0 } as Covid19State;

    beforeEach(() => {
        jest.resetAllMocks();
        (useCovid19Dispatch as jest.Mock<Dispatch<Covid19Event>>).mockReturnValue(mockCovid19Dispatch);
        (useCovid19State as jest.Mock<Covid19State>).mockReturnValue(mockCovid19State);
    });

    it('renders an input range', () => {
        render(<TimeFrameControl/>);
        const input = screen.getByLabelText('input-range');
        expect(input.getAttribute('type')).toEqual('range');
    });

    it('renders an input with a value matching that of the time frame', () => {
        const timeFrame = 51;
        (useCovid19State as jest.Mock<Covid19State>).mockReturnValue({ timeFrame } as Covid19State);

        render(<TimeFrameControl/>);
        const input = screen.getByLabelText('input-range');
        expect(input.getAttribute('value')).toEqual(`${timeFrame}`);
    });

    it('renders an input with a min of 0', () => {
        render(<TimeFrameControl/>);
        const input = screen.getByLabelText('input-range');
        expect(input.getAttribute('min')).toEqual('0');
    });

    it('renders an input with a max matching that of the number of days since the 2020-03-01', () => {
        const dateSpy = jest.spyOn(global.Date, 'now').mockImplementation(() => Date.UTC(2020, 4, 30, 12));
        render(<TimeFrameControl/>);
        const input = screen.getByLabelText('input-range');
        expect(input.getAttribute('max')).toEqual('90');
        dateSpy.mockRestore();
    });

    it('triggers a time frame changed event on input changed', () => {
        render(<TimeFrameControl />);
        const input = screen.getByLabelText('input-range');
        fireEvent.input(input, { target: { value: 3 }});
        expect(mockCovid19Dispatch).toHaveBeenCalledWith(new TimeFrameChangedEvent(3));
    });

    it('initially renders the base date 2020-03-01', () => {
        render(<TimeFrameControl/>);
        const dateText = screen.getByText('2020-03-01');
        expect(dateText).toBeInTheDocument();
    });

    it('renders a date that reflects the time frame relative to the base date', () => {
        (useCovid19State as jest.Mock<Covid19State>).mockReturnValue({ timeFrame: 40 } as Covid19State);

        render(<TimeFrameControl/>);
        const dateText = screen.getByText('2020-04-10');
        expect(dateText).toBeInTheDocument();
    });
});