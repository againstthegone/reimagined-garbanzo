import fs from 'fs';

import Papa from 'papaparse';

import { CountryCaseData } from "./CountryCaseData";


const COUNTRY_HEADER = 'Country/Region';

export function fromCsvFile(csvPath = 'COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'): CountryCaseData[] {
    const file = fs.readFileSync(csvPath).toString();
    const { data, errors } = Papa.parse(file, { header: true, skipEmptyLines: true });
    if (errors[0]) {
        console.log(errors);
        throw new Error(`Unable to parse Global Confirmed Time Series from ${csvPath}:\n\t${errors}`);
    }
    return data
        .map(province => {
            const country = province[COUNTRY_HEADER];
            const timeline = Object.keys(province)
                .filter(key => key.match(/^\d+\/\d+\/\d+$/))
                .map(key => {
                    const [monthCapture, dayCapture, yearCapture] = key.match(/\d+/g);
                    const isoDay = dayCapture.padStart(2, '0');
                    const isoMonth = monthCapture.padStart(2, '0');
                    const isoYear = yearCapture.padStart(4, '20');
                    return { date: `${isoYear}-${isoMonth}-${isoDay}`, confirmed: parseInt(province[key]) };
                })
            return {
                country,
                timeline,
            } as CountryCaseData;
        })
        .reduce((countryCaseDatas, provinceCaseData) => {
            const countryCaseData = countryCaseDatas.find(({ country }) => country === provinceCaseData.country);
            if (countryCaseData) {
                provinceCaseData.timeline
                    .forEach(({ date, confirmed }) =>
                        countryCaseData.timeline.find(({ date: countryDate }) => countryDate === date).confirmed += confirmed)
            } else {
                countryCaseDatas.push(provinceCaseData);
            }
            return countryCaseDatas;
        }, [] as CountryCaseData[]);
}