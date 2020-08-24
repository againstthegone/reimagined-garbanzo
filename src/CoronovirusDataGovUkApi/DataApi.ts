import { LowerTierLocalAuthorityAreaName } from "../LowerTierLocalAuthority";

const DATA_URL = 'https://api.coronavirus.data.gov.uk/v1/data';

export interface DailyNewCasesBySpecimanDateDatum {
    date: string;
    newCasesBySpecimenDate: number;
}

interface DailyNewCasesBySpecimanDateResponseBody {
    length: number;
    maxPageLimit: number;
    data: DailyNewCasesBySpecimanDateDatum[];
}

export async function getLowerTierLocalAuthorityDailyNewCasesBySpecimanDate(areaName: LowerTierLocalAuthorityAreaName): Promise<DailyNewCasesBySpecimanDateDatum[]> {
    const url = `${DATA_URL}?filters=areaType=ltla;areaName=${areaName}&structure={"date":"date","newCasesBySpecimenDate":"newCasesBySpecimenDate"}`;
    const response = await fetch(url);
    const { data }: DailyNewCasesBySpecimanDateResponseBody = await response.json();
    return data;
}