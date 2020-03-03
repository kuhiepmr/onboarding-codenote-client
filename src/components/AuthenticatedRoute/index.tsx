import React from "react";
import { connect } from 'react-redux';
import { Redirect, Route } from "react-router-dom";

const Authenticated = ({ component: C, isAuthenticated, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? <C {...props} />
        : <Redirect
          to={`/login?redirect=${props.location.pathname}${props.location
            .search}`}
        />}
  />;

const mapStateToProps = (state) => ({
  isAuthenticated: state.authenticate.isAuthenticated,
});

export default connect(mapStateToProps)(Authenticated);