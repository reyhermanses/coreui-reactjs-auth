import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useCookies } from 'react-cookie'

function ProtectedRoute ({ component: Component, ...restOfProps }) {
  const [cookies, setCookie] = useCookies(['token'])
  
    return (
        <Route
            {...restOfProps}
            render={(props) => {
                    // console.log(props)
                    cookies.token !== null ? <Component {...props} /> : <Navigate to="/login" replace />
                }
            }
        />
    );

}

export default ProtectedRoute;