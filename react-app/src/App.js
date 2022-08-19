import React from 'react';
import { Routes, Route } from "react-router-dom";

import { HomeLayout } from "./components/HomeLayout";
import { ProtectedLayout } from "./components/ProtectedLayout";

import  HomePage from "./pages/Home/home";
import LoginPage from "./pages/Login/login";
import CallbackPage from "./pages/Callback/callback";
import ProfilePage from "./pages/Profile/profile";
// import RaterPage from "./pages/Rater/rater";

import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route element={<HomeLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<CallbackPage />} />
        </Route>

        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route path="profile" element={<ProfilePage />} />
          {/* <Route path="rater" element={<RaterPage />} /> */}
        </Route>

        <Route path="*" element={<p> 404 killme kudesai</p>} />
      </Routes>
    </div>
  );
}

export default App;
