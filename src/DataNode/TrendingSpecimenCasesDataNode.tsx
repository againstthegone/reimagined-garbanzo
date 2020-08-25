import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { LowerTierLocalAuthorityAreaName } from "../LowerTierLocalAuthority";
import { getLowerTierLocalAuthorityDailyNewCasesBySpecimanDate } from '../CoronovirusDataGovUkApi/DataApi';

interface TrendingSpecimenCasesDataNodeProps {
    areaName: LowerTierLocalAuthorityAreaName;
}

const fetchAndCalculateTrendingLowerTierLocalAuthoritySpecimenNewCases = async (areaName: LowerTierLocalAuthorityAreaName) => {
    const data = await getLowerTierLocalAuthorityDailyNewCasesBySpecimanDate(areaName);
    const newCasesBySpecimenDates: number[] = data.map(d => d.newCasesBySpecimenDate);
    const runningWeeks: number[][] = newCasesBySpecimenDates.map((_: number, i: number, a: number[]) => [...a, ...new Array(7).fill(undefined)].slice(i, i + 7)).filter((week) => !week.includes(undefined));
    const runningAverage = runningWeeks.map((week) => week.reduce((a, b) => a + b)).map((total) => total / 7);
    return runningAverage;
}

const TrendingSpecimenCasesDataNode = ({ areaName }: TrendingSpecimenCasesDataNodeProps) => {

    const [data, setData] = useState<number[] | undefined>(undefined);
    const [index, setIndex] = useState<number | undefined>(undefined);

    const fetchAndSetData = useCallback(() => (async function () {
        try {
            const data = await fetchAndCalculateTrendingLowerTierLocalAuthoritySpecimenNewCases(areaName);
            setData(data);
            setIndex(0);
        }
        catch (e) {
            setData([]);
        }
    })(), [areaName]);

    useEffect(() => {
        fetchAndSetData();
    }, [fetchAndSetData]);

    const className = useMemo(() => {
        if (data === undefined) {
            return 'node';
        } else if (data.length === 0 ) {
            return 'node error-node';
        } else {
            return 'node data-node';
        }
    }, [data]);
    

    return (<div className={className}><div style={{position: 'absolute', fontSize: '1rem'}}>yo</div></div>)
};

export { TrendingSpecimenCasesDataNode };