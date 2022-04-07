import React from "react";
import { Route, Redirect } from "react-router";
import { isLoginMasyarakat } from "../helper/isLogin";

const PrivateRouteMasyarakat = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoginMasyarakat() ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

export default PrivateRouteMasyarakat;
