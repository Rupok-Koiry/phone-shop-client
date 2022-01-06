import { Redirect, Route } from "react-router";
import { AuthContext } from "../store/auth-context";
import React, { useContext } from "react";
import Loader from "./Loader/Loader";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Loader />;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
