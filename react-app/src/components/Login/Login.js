import React, { useState }from 'react';
import { useNavigate} from 'react-router-dom';
import './Login.css';

function Login() {

    let navigate = useNavigate()

    async function clickSignIn(e) {
        console.log("clicked login button")
        try{
            //window.location.replace("http://google.com") // change to external
            //navigate("/sussy") // change to local url
        }
        catch(err){
            console.log(err.message)
        }
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