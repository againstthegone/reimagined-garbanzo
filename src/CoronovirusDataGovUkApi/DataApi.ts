import { CoronovirusDataGovUkEnvironment } from './CoronovirusDataGovUkEnvironment';
import { LowerTierLocalAuthorityAreaName } from "./LowerTierLocalAuthorityAreaName";
import { NewCasesBySpecimenDateDatum } from './NewCasesBySpecimenDateDatum';
import { getCoronovirusDataGovUkEnvironment } from '../config';

const DATA_URL = 'https://api.coronavirus.data.gov.uk/v1/data';
const STAGING_URL = 'https://api.coronavirus-staging.data.gov.uk/v1/data';

interface NewCasesBySpecimanDateResponseBody {
    length: number;
    maxPageLimit: number;
    data: NewCasesBySpecimenDateDatum[];
}

export async function getLowerTierLocalAuthorityNewCasesBySpecimanDate(areaName: LowerTierLocalAuthorityAreaName): Promise<NewCasesBySpecimenDateDatum[]> {
    const baseUrl = getCoronovirusDataGovUkEnvironment() === CoronovirusDataGovUkEnvironment.PRODUCTION ?
        DATA_URL :
        STAGING_URL;
    const url = `${baseUrl}?filters=areaType=ltla;areaName=${areaName}&structure={"date":"date","newCasesBySpecimenDate":"newCasesBySpecimenDate"}`;
    const response = await fetch(url);
    const { data }: NewCasesBySpecimanDateResponseBody = await response.json();
    return data;
}