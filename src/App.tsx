import React, { useMemo, useReducer } from 'react';
import './App.scss';
import { Covid19Context } from './Covid19/Covid19Context';
import { handleCovid19Event } from './Covid19/Covid19Event';
import { createDefaultCovid19State } from './Covid19/Covid19State';
import { GreaterManchesterNodeCanvas } from './DataNode/GreaterManchesterDataNodeCanvas';
import { TimeFrameControl } from './TimeFrame/TimeFrameControl';

const App = () => {

  const [covid19State, covid19Dispatch] = useReducer(handleCovid19Event, createDefaultCovid19State());

  const covid19Context = useMemo(() => ({
    dispatch: covid19Dispatch,
    state: covid19State,
  }), [covid19Dispatch, covid19State]);

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <Covid19Context.Provider value={covid19Context}>
        <GreaterManchesterNodeCanvas />
        <TimeFrameControl />
      </Covid19Context.Provider>
    </div>
  );
}

export default App;
