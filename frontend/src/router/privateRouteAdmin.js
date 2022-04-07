import React from "react";
import { Route, Redirect } from "react-router";
import { isLoginAdmin } from "../helper/isLogin";

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoginAdmin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRouteAdmin;
