import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const PrivateRoute = ({ component: Component, ...rest }) => { 
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    if(!loading && !error && user) 
        return (
          <React.Fragment>
            <Route
              {...rest}
              render={(props) => {
                user ? <Component {...props} /> : navigate("/");
              }}
            ></Route>
          </React.Fragment>
        );
}