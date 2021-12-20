import React, { useEffect, useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import './App.css';
import SimpsonsTable from './simpsonsPage/SimpsonsTable'
// import SimpsonsTable from './simpsonsPage/SimpsonsTable';

const App = () => {
  

  return (
    <>
      <SimpsonsTable />
    </>
  );
};

export default App;
