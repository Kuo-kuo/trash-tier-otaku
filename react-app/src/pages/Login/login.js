import React from 'react';
import { useNavigate} from 'react-router-dom';
import './login.css';

function LoginPage() {

    let navigate = useNavigate()

    async function clickSignIn(e) {
        console.log("clicked login button")
        try{
            if (true){ // change later
                const response = await fetch("/auth", 
                    {
                        method: "GET"
                    }
                )
                
                const parseResponse = await response.json()
                console.log(parseResponse)
                window.location.replace(parseResponse.redirect) 
            }
            else {
                navigate("/dashboard")
            }
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
                    <button className="button" onClick={clickSignIn}>Sign in using MAL</button>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;