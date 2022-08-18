import React, { Fragment, useState } from 'react';
import Login from './components/Login/login';
import Callback from './components/Callback/callback';
import Rater from './components/Rater/rater';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './App.css';

function App() {

  const [user_id, setID] = useState()

  return (
    <Fragment>
      <Router>
        <div className='App'>
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/login" />}
          />
          <Route 
            path="/login" 
            element={<Login
                      user_id={user_id} 
                      setID={setID}
                    />}
          />
          <Route 
            path="/callback" 
            element={<Callback 
                        user_id={user_id} 
                        setID={setID}
                    />}
          />
          <Route
            path="/sussy"
            element={<p> 404 killme kudesai</p>}
          />
          <Route
            path="/rater"
            element={<Rater 
                      user_id={user_id} 
                      setID={setID}
                    />}
          />
        </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
