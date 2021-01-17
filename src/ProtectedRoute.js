import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);
  console.log("authContext", authContext);
  const { isLoggedIn } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
