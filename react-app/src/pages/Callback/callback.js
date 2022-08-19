import React, {useEffect }from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

import './callback.css';

function CallbackPage() {
    let [searchParams, setSearchParams] = useSearchParams()
    
    let navigate = useNavigate()
    
    const { login } = useAuth();

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
            login({
                'user_id': parseResponse.user_id
            });
        }
        
        try{
            fetchData()
        }
        catch(err){
            console.log(err.message)
        }
    });

    async function clickRedirect(e) {
        navigate("/dashboard")
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

export default CallbackPage;