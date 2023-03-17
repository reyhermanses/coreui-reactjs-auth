import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute ({ component: Component, ...restOfProps }) {

    const isAuthenticated = localStorage.getItem("api_token");
    console.log("this", isAuthenticated);
    
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated !== null ? <Component {...props} /> : <Navigate to="/login" replace />
            }
        />
    );

}

export default ProtectedRoute;