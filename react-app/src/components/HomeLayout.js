import React from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function HomeLayout() {
    const { user } = useAuth();
    const outlet = useOutlet();
    console.log(user)
    if (user) {
        return <Navigate to="/dashboard/profile" replace />;
    }

    return (
        <div>
            {outlet}
        </div>
    );
}