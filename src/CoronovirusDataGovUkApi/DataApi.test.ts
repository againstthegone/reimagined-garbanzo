import { getLowerTierLocalAuthorityDailyNewCasesBySpecimanDate, DailyNewCasesBySpecimanDateDatum } from './DataApi';
import { LowerTierLocalAuthorityAreaName } from '../LowerTierLocalAuthority';
import axios from 'axios';

describe('DataApi', () => {

    beforeEach(() => {
        jest.resetAllMocks();
        global.fetch = jest.fn();
    });

    function mockFetchToRespondAny() {
        mockFetchToRespondWith([{
            date: '2020-08-24',
            newCasesBySpecimenDate: 12,
        }]);
    }

    function mockFetchToRespondWith(cases: DailyNewCasesBySpecimanDateDatum[]) {
        (global.fetch as jest.Mock).mockResolvedValue({
            json: () => ({
                length: cases.length,
                maxPageLimit: 1000,
                data: cases,
            }),
        });
    }

    function mockFetchToPerformIntegration() {
        (global.fetch as jest.Mock).mockImplementation((url) => axios.get(url).then(response => Promise.resolve(({ json: () => response.data }))));
    }

    describe('getLowerTierLocalAuthorityDailyNewCasesBySpecimanDate', () => {
        it('calls the data url with the local authority passed in', () => {
            mockFetchToRespondAny();

            getLowerTierLocalAuthorityDailyNewCasesBySpecimanDate(LowerTierLocalAuthorityAreaName.Bolton);
            expect(global.fetch).toHaveBeenCalledWith('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Bolton&structure={"date":"date","newCasesBySpecimenDate":"newCasesBySpecimenDate"}');
        });

        it('responds with a new cases by specimen date timeline', async () => {
            const mockResponse = [
                {
                    date: '2020-05-02',
                    newCasesBySpecimenDate: 2,
                },
                {
                    date: '2020-05-01',
                    newCasesBySpecimenDate: 4,
                }
            ];
            mockFetchToRespondWith(mockResponse);

            const result = await getLowerTierLocalAuthorityDailyNewCasesBySpecimanDate(LowerTierLocalAuthorityAreaName.Oldham);
            expect(result).toEqual(mockResponse);
        });


        it('integrates directly with the data coronovirus api', async () => {
            mockFetchToPerformIntegration();

            const today = new Date();
            const todayIsoDate = today.toISOString().substring(0, 10);

            const result = await getLowerTierLocalAuthorityDailyNewCasesBySpecimanDate(LowerTierLocalAuthorityAreaName.Stockport);
            expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    date: todayIsoDate,
                }),
                {
                    date: '2020-03-01',
                    newCasesBySpecimenDate: 1,
                }]));
        });
    });
});
