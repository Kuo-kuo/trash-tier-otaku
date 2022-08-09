import React, { useState, useEffect }from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom';
import './Callback.css';

function Callback() {
    let [searchParams, setSearchParams] = useSearchParams()
    
    let navigate = useNavigate()
    
    useEffect(() => {
        const auth_code = searchParams.get("code")
        const request_id = searchParams.get("state")

        async function fetchData() {
            const body = { auth_code, request_id };

            const response = await fetch("/callback",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            const parseResponse = await response.json();
            console.log(parseResponse)
        }
        
        try{
            fetchData()
            // window.location.replace("/sussy")// fix this shit l8r
        }
        catch(err){
            console.log(err.message)
        }
    });

    async function clickRedirect(e) {
        console.log("redirected lol jk") // fix this shit l8r noob
    }
    // Defines UI for Login component
    return (
        <div className="callback-container">
            <div className="large-title">Login Successfull!</div>
            <div className="small-title">Please wait while redirecting... </div>
            <div className='small-title'>Didn't get redirected?</div>
            <div className='redir'>
                <button className="button" onClick={clickRedirect}>Click Here!</button>
            </div>
        </div>
    );
}

export default Callback;