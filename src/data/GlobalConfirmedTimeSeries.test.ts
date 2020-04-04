import fs from 'fs';
import { fromCsvFile } from './GlobalConfirmedTimeSeries';

describe('Global Confirmed Time Series', () => {

    describe('parseCsvFile', () => {
        const csvFileName = 'GlobalConfirmedTimeSeries_parseCsvFileTest.csv';

        afterEach(() => {
            fs.unlinkSync(csvFileName);
        });

        it('is able to transcribe csv data of a single entry to country case entries', () => {
            const csvData = 'Province/State,Country/Region,Lat,Long,1/22/20,1/23/20,1/24/20\r\nHubei,China,30.9756,112.2707,444,444,549\r\n';
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

        it('is able to transcribe csv data of multiple entries to country case entries', () => {
            const csvData = 'Province/State,Country/Region,Lat,Long,1/22/20,1/23/20,1/24/20\r\n' +
                'Hubei,China,30.9756,112.2707,444,444,549\r\n' + 
                ',Japan,36.0,138.0,2,2,2\r\n' + 
                ',"Korea, South",36.0,128.0,1,1,2\r\n';
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
                        }
                    ]
                },
                {
                    country: 'Japan',
                    timeline: [
                        {
                            date: '2020-01-22',
                            confirmed: 2
                        },
                        {
                            date: '2020-01-23',
                            confirmed: 2
                        },
                        {
                            date: '2020-01-24',
                            confirmed: 2
                        }
                    ]
                },
                {
                    country: 'Korea, South',
                    timeline: [
                        {
                            date: '2020-01-22',
                            confirmed: 1
                        },
                        {
                            date: '2020-01-23',
                            confirmed: 1
                        },
                        {
                            date: '2020-01-24',
                            confirmed: 2
                        }
                    ]
                }
            ]);
        });

        it('is able to transcribe csv data of multiple entries of the same country to country case entries', () => {
            const csvData = 'Province/State,Country/Region,Lat,Long,1/22/20,1/23/20,1/24/20\r\n' +
                'Hubei,China,30.9756,112.2707,444,444,549\r\n' + 
                'Shanghai,China,31.201999999999998,121.4491,9,16,20\r\n' +
                ',Japan,36.0,138.0,2,2,2\r\n';
            fs.writeFileSync(csvFileName, csvData);

            const caseEntries = fromCsvFile(csvFileName);
            expect(caseEntries).toEqual([
                {
                    country: 'China',
                    timeline: [
                        {
                            date: '2020-01-22',
                            confirmed: 453
                        },
                        {
                            date: '2020-01-23',
                            confirmed: 460
                        },
                        {
                            date: '2020-01-24',
                            confirmed: 569,
                        }
                    ]
                },
                {
                    country: 'Japan',
                    timeline: [
                        {
                            date: '2020-01-22',
                            confirmed: 2
                        },
                        {
                            date: '2020-01-23',
                            confirmed: 2
                        },
                        {
                            date: '2020-01-24',
                            confirmed: 2
                        }
                    ]
                }
            ]);
        });
    });

    describe('Integration Test', () => {
        it('is able to read the country case data from the real data', () => {
            const caseEntries = fromCsvFile();
            expect(caseEntries).toBeTruthy();
            expect(caseEntries.find(({ country }) => country === 'China').timeline[0].confirmed).toEqual(548);
        });
    });
});