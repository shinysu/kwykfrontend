import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import RouteChangeTracker from './components/RouteChangeTracker';
import ReactGA from 'react-ga4';


function App() {
  const TRACKING_ID = "G-YBYHCW1NML";
  ReactGA.initialize(TRACKING_ID);
  return(
    <Router >
      <div className="App">
        <RouteChangeTracker />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
