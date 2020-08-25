import { AreaDataStatus } from '../AreaData/AreaDataStatus';
import { NewCasesBySpecimenDateDatum } from "../CoronovirusDataGovUkApi/NewCasesBySpecimenDateDatum";

export interface Covid19State {
    timeFrame: number;
    data: {
        [key: string]: {
            status: AreaDataStatus;
            data?: NewCasesBySpecimenDateDatum[];
        };
    };
}

export const createDefaultCovid19State = () => ({
    timeFrame: 0,
    data: {}
});