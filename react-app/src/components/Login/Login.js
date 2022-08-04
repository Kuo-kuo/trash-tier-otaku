import React, { useState }from 'react';
import './Login.css';

function Login() {

    function clickSignIn() {
        console.log("clicked signin")
    }

    // Defines UI for Login component
    return (
        <div className="login-container">

            <div className="left-section">
                <div className="large-title">Trash Tier Otaku</div>
                <div className="small-title">Rate Your Anime Taste</div>
            </div>

            <div className="right-section">
                <div className='mal-login'>
                    <button className="button" onClick={clickSignIn}>Sign in to MAL</button>
                </div>
            </div>

        </div>
    );
}

export default Login;