import React, { Fragment, useState, useEffect } from 'react';
import Login from './components/Login/Login';


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './App.css';

function App() {
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
            element={<Login/>}
          />
          <Route
            path="/sussy"
            element={<p> 404 killme kudesai</p>}
          />
        </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
