import { LowerTierLocalAuthorityAreaName } from "../LowerTierLocalAuthorityAreaName";
import { NewCasesBySpecimenDateDatum } from './NewCasesBySpecimenDateDatum';

const DATA_URL = 'https://api.coronavirus.data.gov.uk/v1/data';

interface NewCasesBySpecimanDateResponseBody {
    length: number;
    maxPageLimit: number;
    data: NewCasesBySpecimenDateDatum[];
}

export async function getLowerTierLocalAuthorityNewCasesBySpecimanDate(areaName: LowerTierLocalAuthorityAreaName): Promise<NewCasesBySpecimenDateDatum[]> {
    const url = `${DATA_URL}?filters=areaType=ltla;areaName=${areaName}&structure={"date":"date","newCasesBySpecimenDate":"newCasesBySpecimenDate"}`;
    const response = await fetch(url);
    const { data }: NewCasesBySpecimanDateResponseBody = await response.json();
    return data;
}