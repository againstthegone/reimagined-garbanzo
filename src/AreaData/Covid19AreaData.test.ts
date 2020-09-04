import { renderHook } from '@testing-library/react-hooks';
import { LowerTierLocalAuthorityAreaName } from '../CoronovirusDataGovUkApi/LowerTierLocalAuthorityAreaName';
import { AreaDataStatus } from './AreaDataStatus';
import { useCovid19AreaData } from './Covid19AreaData';
import { useCovid19Dispatch, useCovid19State } from '../Covid19/Covid19Context';
import { Dispatch } from 'react';
import { Covid19Event } from '../Covid19/Covid19Event';
import { Covid19State } from '../Covid19/Covid19State';
import { AreaDataRequestedEvent } from './AreaDataRequestedEvent';
import { AreaDataRejectedEvent } from './AreaDataRejectedEvent';
import { eventually } from '../jestExtensions';
import { AreaDataResolvedEvent } from './AreaDataResolvedEvent';
import { NewCasesBySpecimenDateDatum } from '../CoronovirusDataGovUkApi/NewCasesBySpecimenDateDatum';
import { getLowerTierLocalAuthorityNewCasesBySpecimanDate } from '../CoronovirusDataGovUkApi/DataApi';

jest.mock('../Covid19/Covid19Context');
jest.mock('../CoronovirusDataGovUkApi/DataApi');

describe('Covid19AreaData', () => {

    const mockCovid19Dispatch = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
        (useCovid19Dispatch as jest.Mock<Dispatch<Covid19Event>>).mockReturnValue(mockCovid19Dispatch);
        (useCovid19State as jest.Mock<Covid19State>).mockReturnValue({ data: {} } as Covid19State);
    });

    it('defaults to a fetching state if it does not exist', () => {
        const { result } = renderHook(() => useCovid19AreaData(LowerTierLocalAuthorityAreaName.Manchester));

        expect(result.current.status).toEqual(AreaDataStatus.FETCHING);
    });

    it('responds with the area state in the store', () => {
        (useCovid19State as jest.Mock<Covid19State>).mockReturnValue(
            {
                data: {
                    [LowerTierLocalAuthorityAreaName.Bury]: {
                        status: AreaDataStatus.COMPLETE,
                    },
                } as Covid19State['data'],
            } as Covid19State,
        );

        const { result } = renderHook(() => useCovid19AreaData(LowerTierLocalAuthorityAreaName.Bury));

        expect(result.current.status).toEqual(AreaDataStatus.COMPLETE);
    });

    it('responds with empty data if it does not exist in the store', () => {
        const { result } = renderHook(() => useCovid19AreaData(LowerTierLocalAuthorityAreaName.Manchester));

        expect(result.current.data).toEqual([]);
    });

    it('responds with the area data in the store', () => {
        const data = [
            {
                date: '2020-03-02',
                newCasesBySpecimenDate: 4,
            },
            {
                date: '2020-03-01',
                newCasesBySpecimenDate: 2,
            }
        ];

        (useCovid19State as jest.Mock<Covid19State>).mockReturnValue(
            {
                data: {
                    [LowerTierLocalAuthorityAreaName.Salford]: {
                        data,
                    } as Covid19State['data'][string],
                } as Covid19State['data'],
            } as Covid19State,
        );

        const { result } = renderHook(() => useCovid19AreaData(LowerTierLocalAuthorityAreaName.Salford));

        expect(result.current.data).toEqual(data);
    });

    it('dispatches a data requested event for the area', (done) => {
        renderHook(() => useCovid19AreaData(LowerTierLocalAuthorityAreaName.Oldham));

        eventually(done)(() => {
            expect(mockCovid19Dispatch).toHaveBeenCalledWith(new AreaDataRequestedEvent(LowerTierLocalAuthorityAreaName.Oldham));
        });
    });

    it('dispatches a data resolved event for the area on receiving a successful data request', (done) => {
        (getLowerTierLocalAuthorityNewCasesBySpecimanDate as jest.Mock<Promise<NewCasesBySpecimenDateDatum[]>>).mockResolvedValue([{ date: '2020-03-02', newCasesBySpecimenDate: 0 }, { date: '2020-03-01', newCasesBySpecimenDate: 1 }]);

        renderHook(() => useCovid19AreaData(LowerTierLocalAuthorityAreaName.Bolton));

        eventually(done)(() => {
            expect(mockCovid19Dispatch).toHaveBeenCalledWith(new AreaDataResolvedEvent(LowerTierLocalAuthorityAreaName.Bolton, [{ date: '2020-03-02', newCasesBySpecimenDate: 0 }, { date: '2020-03-01', newCasesBySpecimenDate: 1 }]));
        });
    });

    it('dispatches a data rejected event for the area when the data request fails', (done) => {
        (getLowerTierLocalAuthorityNewCasesBySpecimanDate as jest.Mock<Promise<NewCasesBySpecimenDateDatum[]>>).mockRejectedValue(new Error());

        renderHook(() => useCovid19AreaData(LowerTierLocalAuthorityAreaName.Stockport));

        eventually(done)(() => {
            expect(mockCovid19Dispatch).toHaveBeenCalledWith(new AreaDataRejectedEvent(LowerTierLocalAuthorityAreaName.Stockport));
        });
    });
});
