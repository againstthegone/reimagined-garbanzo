import React, { createContext, Dispatch, useContext, useMemo, useReducer } from 'react';
import './App.css';
import { TimeFrameControl } from './TimeFrameControl';

const App = () => {

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <TimeFrameControl />
      {/* {isPending && (<div>Loading...</div>)}
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
      {isRejected && (<div>{error}</div>)} */}
    </div>
  );
}

export default App;
