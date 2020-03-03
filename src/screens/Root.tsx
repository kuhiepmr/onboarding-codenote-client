import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from '../components/AppliedRoute';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import Navigation from '../components/Navigation';
import UnauthenticatedRoute from '../components/UnauthenticatedRoute';
import Home from './Home';
import Login from './Login';
import NoteDetail from './NoteDetail';
import NotFound from './NotFound';
import Signup from './Signup';

const ScreensRoot = ({ childProps }) => (
  <Fragment>
    <AppliedRoute component={Navigation} props={childProps} />
    <Switch>
      <AppliedRoute exact path="/" component={Home} props={childProps} />
      <AppliedRoute path="/login" exact component={Login} props={childProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
      <AuthenticatedRoute path="/notes/:id" exact component={NoteDetail} props={childProps} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default ScreensRoot;
