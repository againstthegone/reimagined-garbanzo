import { createContext, Dispatch, useContext } from "react";
import { Covid19State, createDefaultCovid19State } from './Covid19State';

interface Covid19ContextValue { 
    dispatch: Dispatch<Covid19State>;
    state: Covid19State;
};

const DEFAULT_COVID_19_CONTEXT_VALUE: Covid19ContextValue = {
    dispatch: () => {
        throw new Error('Create Covid19Context dispatch with useReducer');
    },
    state: createDefaultCovid19State(),
}

export const Covid19Context = createContext<Covid19ContextValue>(DEFAULT_COVID_19_CONTEXT_VALUE);

export const useCovid19Dispatch = () => {
    const { dispatch } = useContext(Covid19Context);
    return dispatch;
}

export const useCovid19State = () => {
    const { state } = useContext(Covid19Context);
    return state;
}