import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withAuthenticationStatus } from "../HOC";

const AuthenticatedRoute = ({ component: C, isAuthenticated, location, ...rest }) => {
  const { pathname, search } = location;

  return <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? <C {...props} />
        : <Redirect
          to={`/login?redirect=${pathname}${search}`}
        />}
  />;
}


export default withAuthenticationStatus(AuthenticatedRoute);