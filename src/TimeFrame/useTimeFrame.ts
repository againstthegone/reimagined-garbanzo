import { useCovid19State } from '../Covid19/Covid19Context';

export const useTimeFrame = () => {
    const state = useCovid19State();
    return state.timeFrame;
};