import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ component: Component, requiredRoles, ...rest }) {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const isAuthenticated = user ? user["x-auth-token"] : false;
  const isAuthorized = user ? requiredRoles.includes(user.data.role) : false;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: isAuthenticated ? "/unfound" : "/" }} />
        )
      }
    />
  );
}

export default ProtectedRoute;
