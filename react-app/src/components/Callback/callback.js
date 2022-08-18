import React, {useEffect }from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom';
import './callback.css';

function Callback({user_id, setID}) {
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
            setID(parseResponse.user_id)
            // navigate("/rater")
        }
        
        try{
            fetchData()
        }
        catch(err){
            console.log(err.message)
        }
    });

    async function clickRedirect(e) {
        navigate("/rater")
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