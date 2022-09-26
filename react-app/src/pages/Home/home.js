import React from 'react';
import { Navigate} from 'react-router-dom';

function HomePage() {
    // Defines UI for Login component
    return (
        <Navigate to="/login" replace/>
    );
}

export default HomePage;