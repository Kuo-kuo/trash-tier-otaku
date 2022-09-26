import React from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedLayout() {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            {outlet}
        </div>
    );
}
