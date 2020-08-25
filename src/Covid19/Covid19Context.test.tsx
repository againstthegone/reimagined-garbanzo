import React from 'react';
import { render } from '@testing-library/react';
import { Dispatch } from 'react';
import { Covid19State, createDefaultCovid19State } from './Covid19State';
import { Covid19Context, useCovid19Dispatch, useCovid19State } from './Covid19Context';

describe('Covid19Context', () => {
    describe('useCovid19Dispatch', () => {
        it('retrieves the dispatch from the context', () => {
            const mockDispatch: Dispatch<Covid19State> = jest.fn();
            let covid19ContextDispatch;

            const UseCovid19Dispatch = () => {
                covid19ContextDispatch = useCovid19Dispatch();
                return (<></>);
            }

            render(<Covid19Context.Provider value={{ dispatch: mockDispatch, state: createDefaultCovid19State() }}>
                <UseCovid19Dispatch></UseCovid19Dispatch>
            </Covid19Context.Provider>);

            expect(covid19ContextDispatch).toEqual(mockDispatch);
        });
    });

    describe('useCovid19State', () => {
        it('retrieves the state from the context', () => {
            const mockState: Covid19State = {
                ...createDefaultCovid19State(),
                timeFrame: 3,
            };
            let covid19ContextState;

            const UseCovid19State = () => {
                covid19ContextState = useCovid19State();
                return (<></>);
            }

            render(<Covid19Context.Provider value={{ dispatch: jest.fn(), state: mockState }}>
                <UseCovid19State></UseCovid19State>
            </Covid19Context.Provider>);

            expect(covid19ContextState).toEqual(mockState);
        });
    });
})