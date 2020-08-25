import React, { useState, useEffect, useMemo, useReducer, Reducer } from 'react';
import './App.css';
import { TrendingSpecimenCasesDataNode } from './DataNode';
import { LowerTierLocalAuthorityAreaName } from './LowerTierLocalAuthority';
import { NoDataNode } from './DataNode/NoDataNode';

interface CoronovirusData {
  date: string;
  newCasesBySpecimenDate: number;
}

enum DataGovCoronovirusDataStatus {
  PENDING,
  RESOLVED,
  REJECTED,
};

enum DataGovCoronovirusDataActionType {
  RESOLVED,
  REJECTED
};

type DataGovCoronovirusDataAction = DataGovCoronovirusDataResolvedAction | DataGovCoronovirusDataRejectedAction;

class DataGovCoronovirusDataResolvedAction {
  readonly payload: any;
  readonly type = DataGovCoronovirusDataActionType.RESOLVED;

  constructor(payload: any) {
    this.payload = payload;
  }
}

class DataGovCoronovirusDataRejectedAction {
  readonly error: string;
  readonly type = DataGovCoronovirusDataActionType.REJECTED;

  constructor(error: string) {
    this.error = error;
  }
}

interface DataGovCoronovirusDataState {
  status: DataGovCoronovirusDataStatus;
  data: number[];
  error: string;
}

const initialState: DataGovCoronovirusDataState = {
  status: DataGovCoronovirusDataStatus.PENDING,
  data: [],
  error: ''
};

const DataGovCoronovirusDataReducer: Reducer<DataGovCoronovirusDataState, DataGovCoronovirusDataAction> = (state, action) => {
  switch (action.type) {
    case DataGovCoronovirusDataActionType.REJECTED: {
      return {
        ...state,
        error: action.error,
      };
    }
    case DataGovCoronovirusDataActionType.RESOLVED: {
      const newCasesBySpecimenDates: number[] = action.payload.data.map((d: CoronovirusData) => d.newCasesBySpecimenDate);
      const runningWeeks: number[][] = newCasesBySpecimenDates.map((_: number, i: number, a: number[]) => [...a, ...new Array(7).fill(undefined)].slice(i, i + 7)).filter((week) => !week.includes(undefined));
      const runningAverage = runningWeeks.map((week) => week.reduce((a, b) => a + b)).map((total) => total / 7);
      return {
        ...state,
        data: runningAverage,
        status: DataGovCoronovirusDataStatus.RESOLVED,
      };
    }
    default:
      return state;
  }
}

const useDataGovCoronovirusData = () => {

  const [{ status, data, error }, dispatch] = useReducer(DataGovCoronovirusDataReducer, initialState);

  useEffect(() => {
    if (status === DataGovCoronovirusDataStatus.PENDING) {
      (async () => {
        try {
          const response = await fetch("https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Stockport&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22%7D");
          const json = await response.json();
          dispatch(new DataGovCoronovirusDataResolvedAction(json));
        } catch (error) {
          dispatch(new DataGovCoronovirusDataRejectedAction(error));
        }
      })();
    }
  }, [status]);

  return {
    status, data, error,
  };
};

const App = () => {

  const { status, data, error } = useDataGovCoronovirusData();
  const [frameIndex, setFrameIndex] = useState(0);
  const isPending = useMemo(() => status === DataGovCoronovirusDataStatus.PENDING, [status]);
  const isResolved = useMemo(() => status === DataGovCoronovirusDataStatus.RESOLVED, [status]);
  const isRejected = useMemo(() => status === DataGovCoronovirusDataStatus.REJECTED, [status]);

  useEffect(() => {
    if (isResolved && frameIndex < data.length) {
      setTimeout(() => {
        setFrameIndex(frameIndex + 1);
      }, 100);
    }
  }, [isResolved, frameIndex, data]);

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      {isPending && (<div>Loading...</div>)}
      {isResolved && (
        <>
          <div>{frameIndex}: {data[frameIndex]}</div>
          <div style={{ fontSize: 0 }}>
            <div className='node-row'>
              <NoDataNode></NoDataNode>
              <NoDataNode></NoDataNode>
              <NoDataNode></NoDataNode>
            </div>
            <div className='node-row'>
              <TrendingSpecimenCasesDataNode areaName={LowerTierLocalAuthorityAreaName.Bolton}></TrendingSpecimenCasesDataNode>
              <TrendingSpecimenCasesDataNode areaName={LowerTierLocalAuthorityAreaName.Rochdale}></TrendingSpecimenCasesDataNode>
              <NoDataNode></NoDataNode>
            </div>
            <div className='node-row'>
              <TrendingSpecimenCasesDataNode areaName={LowerTierLocalAuthorityAreaName.Wigan}></TrendingSpecimenCasesDataNode>
              <TrendingSpecimenCasesDataNode areaName={LowerTierLocalAuthorityAreaName.Bury}></TrendingSpecimenCasesDataNode>
              <NoDataNode></NoDataNode>
            </div>
            <div className='node-row'>
              <TrendingSpecimenCasesDataNode areaName={LowerTierLocalAuthorityAreaName.Salford}></TrendingSpecimenCasesDataNode>
              <TrendingSpecimenCasesDataNode areaName={LowerTierLocalAuthorityAreaName.Oldham}></TrendingSpecimenCasesDataNode>
              <NoDataNode></NoDataNode>
            </div>
            <div className='node-row'>
              <NoDataNode></NoDataNode>
              <TrendingSpecimenCasesDataNode areaName={LowerTierLocalAuthorityAreaName.Manchester}></TrendingSpecimenCasesDataNode>
              <TrendingSpecimenCasesDataNode areaName={LowerTierLocalAuthorityAreaName.Tameside}></TrendingSpecimenCasesDataNode>
            </div>
            <div className='node-row'>
              <TrendingSpecimenCasesDataNode areaName={LowerTierLocalAuthorityAreaName.Trafford}></TrendingSpecimenCasesDataNode>
              <TrendingSpecimenCasesDataNode areaName={LowerTierLocalAuthorityAreaName.Stockport}></TrendingSpecimenCasesDataNode>
              <NoDataNode></NoDataNode>
            </div>
          </div>
          <div style={{ display: 'inline-block', width: data[frameIndex], height: data[frameIndex], backgroundColor: 'red', borderRadius: '100%' }}></div>
        </>
      )}
      {isRejected && (<div>{error}</div>)}
    </div>
  );
}

export default App;
