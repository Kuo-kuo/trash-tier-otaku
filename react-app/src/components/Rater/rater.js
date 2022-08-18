import React from 'react';
import { useNavigate} from 'react-router-dom';
import './rater.css';

function Rater({user_id, setID}) {

    let navigate = useNavigate()


    // Defines UI for Login component
    return (
        <div className="login-container">
            <div className="large-title">Hello, Your User ID is</div>
            <div className="small-title">this: {user_id}</div>
        </div>
    );
}

export default Rater;