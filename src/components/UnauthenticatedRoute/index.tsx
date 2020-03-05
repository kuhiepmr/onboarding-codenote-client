import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withAuthenticationStatus } from "../HOC";

const querystring = (name, url = window.location.href) => {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const UnauthenticatedRoute = ({ component: C, isAuthenticated, ...rest }) => {
  const redirect = querystring("redirect");
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated
          ? <C {...props} />
          : <Redirect
            to={redirect === "" || redirect === null ? "/" : redirect}
          />}
    />
  );
};

export default withAuthenticationStatus(UnauthenticatedRoute);
