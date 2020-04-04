import fs from 'fs';
import { fromCsvFile } from './GlobalConfirmedTimeSeries';

describe('Global Confirmed Time Series', () => {

    describe('parseCsvFile', () => {
        const csvFileName = 'GlobalConfirmedTimeSeries_parseCsvFileTest.csv';

        afterEach(() => {
            fs.unlinkSync(csvFileName);
        });

        it('is able to transcribe a simple csv data string to a series of country case entries', () => {
            const csvData = 'Province/State,Country/Region,Lat,Long,1/22/20,1/23/20,1/24/20\r\nHubei,China,30.9756,112.2707,444,444,549';
            fs.writeFileSync(csvFileName, csvData);

            const caseEntries = fromCsvFile(csvFileName);
            expect(caseEntries).toEqual([
                {
                    country: 'China',
                    timeline: [
                        {
                            date: '2020-01-22',
                            confirmed: 444
                        },
                        {
                            date: '2020-01-23',
                            confirmed: 444,
                        },
                        {
                            date: '2020-01-24',
                            confirmed: 549,
                        },
                    ]
                }
            ]);
        });
    });

    describe('Integration Test', () => {
        it('is able to read the country case data from the real data', () => {
            const caseEntries = fromCsvFile();
            expect(caseEntries).toBeTruthy();
            expect(caseEntries.find(({ country }) => country === 'China').timeline[0].confirmed).toBeGreaterThan(0);
        });
    });
});