import React from "react";
import { Switch, Route } from "react-router-dom";
import barang from "./pages/barang";
import lelang from "./pages/lelang";
import petugas from "./pages/petugas";
import dashboard from "./pages/dashboard";
import Login from "./components/form/login";
import Register from "./components/form/register";
import PrivateRoute from "./router/privateRoute";
import PublicRoute from "./router/publicRoute";

function App() {
  return (
    <Switch>
      <PublicRoute
        exact
        path="/"
        restricted={true}
        component={Login}
      ></PublicRoute>
      <PublicRoute
        exact
        path="/register"
        restricted={true}
        component={Register}
      ></PublicRoute>
      <PrivateRoute
        exact
        path="/dashboard"
        component={dashboard}
      ></PrivateRoute>
      <PrivateRoute exact path="/barang" component={barang}></PrivateRoute>
      <PrivateRoute exact path="/lelang" component={lelang}></PrivateRoute>
      <PrivateRoute exact path="/petugas" component={petugas}></PrivateRoute>
    </Switch>
  );
}

export default App;
