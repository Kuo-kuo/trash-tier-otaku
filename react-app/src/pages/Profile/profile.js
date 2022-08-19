import React from 'react';
import './profile.css';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

function ProfilePage() {

    const navigate = useNavigate();
    let user_id = "Hello World"

    const {logout, user} = useAuth();
    async function clickLogout() {
        logout()
    }

    function clickRater(){
        navigate("/dashboard/rater")
    }
    // Defines UI for Login component
    return (
        <div className="rater-container">
            <div className="large-title">Hello, Your User ID is</div>
            <div className="small-title">{user.user_id}</div>
            <button className="button" onClick={clickRater}>Rate my Anime Taste</button>
            <button className="button" onClick={clickLogout}>Logout</button>
        </div>
    );
}

export default ProfilePage;