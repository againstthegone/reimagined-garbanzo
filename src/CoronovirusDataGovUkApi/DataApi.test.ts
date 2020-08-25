import axios from 'axios';
import { getLowerTierLocalAuthorityNewCasesBySpecimanDate } from './DataApi';
import { LowerTierLocalAuthorityAreaName } from './LowerTierLocalAuthorityAreaName';
import { NewCasesBySpecimenDateDatum } from './NewCasesBySpecimenDateDatum';

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

    function mockFetchToRespondWith(cases: NewCasesBySpecimenDateDatum[]) {
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

    describe('getLowerTierLocalAuthorityNewCasesBySpecimanDate', () => {
        it('calls the data url with the local authority passed in', () => {
            mockFetchToRespondAny();

            getLowerTierLocalAuthorityNewCasesBySpecimanDate(LowerTierLocalAuthorityAreaName.Bolton);
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

            const result = await getLowerTierLocalAuthorityNewCasesBySpecimanDate(LowerTierLocalAuthorityAreaName.Oldham);
            expect(result).toEqual(mockResponse);
        });


        it('integrates directly with the data coronovirus api', async () => {
            mockFetchToPerformIntegration();

            const result = await getLowerTierLocalAuthorityNewCasesBySpecimanDate(LowerTierLocalAuthorityAreaName.Stockport);
            expect(result).toEqual(expect.arrayContaining([
                {
                    date: '2020-03-01',
                    newCasesBySpecimenDate: 1,
                }
            ]));
        });
    });
});
