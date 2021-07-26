import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { isAuthenticated } from '../helpers/authFunctions'

/**
 * CONTEXT
 */
import AuthProvider from "../context/AuthProvider";

/**
 * PAGES
 */
import Signin from "../pages/Account/Signin";

/**
 * WRAPPERS
 */
import PostWrapper from "./wrappers/PostWrapper";

function PrivateRoute({ children, ...rest }) {
  const isAuth = isAuthenticated();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuth) {
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

const RouteWrapper = ({ children, isPrivate, ...props }) => {
  if (isPrivate) {
    return <PrivateRoute {...props}>{children}</PrivateRoute>;
  }

  return <Route {...props}>{children}</Route>;
};

const Routes = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <RouteWrapper exact path="/signin">
              <Signin />
            </RouteWrapper>
            <RouteWrapper exact path="/" isPrivate>
              <PostWrapper />
            </RouteWrapper>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default Routes;
