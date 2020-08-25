import { LowerTierLocalAuthorityAreaName } from "../LowerTierLocalAuthority";

const DATA_URL = 'https://api.coronavirus.data.gov.uk/v1/data';

export interface NewCasesBySpecimanDateDatum {
    date: string;
    newCasesBySpecimenDate: number;
}

interface NewCasesBySpecimanDateResponseBody {
    length: number;
    maxPageLimit: number;
    data: NewCasesBySpecimanDateDatum[];
}

export async function getLowerTierLocalAuthorityNewCasesBySpecimanDate(areaName: LowerTierLocalAuthorityAreaName): Promise<NewCasesBySpecimanDateDatum[]> {
    const url = `${DATA_URL}?filters=areaType=ltla;areaName=${areaName}&structure={"date":"date","newCasesBySpecimenDate":"newCasesBySpecimenDate"}`;
    const response = await fetch(url);
    const { data }: NewCasesBySpecimanDateResponseBody = await response.json();
    return data;
}