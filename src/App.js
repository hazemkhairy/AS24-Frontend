import './App.css';
import React, { useState } from 'react'
import InputsContainer from './containers/InputsContainer/InputsContainer'
import ReportsContainer from './containers/ReportsContinater/ReportsContainer'
function App() {
  const [reports, setReports] = useState(null)
  return (
    <div className="App">
      {!reports && <InputsContainer setReports={setReports} />}

      {reports && <ReportsContainer Reports={reports} clearReports={() => { setReports(null) }} />}

    </div>
  );
}

export default App;
