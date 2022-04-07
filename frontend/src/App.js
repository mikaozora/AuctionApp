import React from "react";
import { Switch, Route } from "react-router-dom";
import barang from "./pages/barang";
import lelang from "./pages/lelang";
import petugas from "./pages/petugas";
import history from "./pages/history";
import dashboard from "./pages/dashboard";
import Login from "./components/form/login";
import Register from "./components/form/register";
import PrivateRoute from "./router/privateRoute";
import PublicRoute from "./router/publicRoute";
import Home from "./components/landingpage/home"
import Bid from "./components/landingpage/bid";
import History from "./components/landingpage/history"
import PrivateRouteAdmin from "./router/privateRouteAdmin";
import PrivateRouteMasyarakat from "./router/privateRouteMasyarakat";

function App() {
  return (
    <Switch>
      <PublicRoute
        exact
        path="/login"
        restricted={true}
        component={Login}
      ></PublicRoute>
      <PublicRoute
        exact
        path="/register"
        restricted={true}
        component={Register}
      ></PublicRoute>
      <PrivateRouteMasyarakat
        exact
        path="/"
        restricted={true}
        component={Home}
      ></PrivateRouteMasyarakat>
      <PrivateRouteAdmin
        exact
        path="/dashboard"
        component={dashboard}
      ></PrivateRouteAdmin>
      <PrivateRouteMasyarakat
        exact
        path="/bid"
        component={Bid}
      ></PrivateRouteMasyarakat>
      <PrivateRouteMasyarakat
        exact
        path="/myhistory"
        component={History}
      ></PrivateRouteMasyarakat>
      <PrivateRouteAdmin exact path="/barang" component={barang}></PrivateRouteAdmin>
      <PrivateRouteAdmin exact path="/lelang" component={lelang}></PrivateRouteAdmin>
      <PrivateRouteAdmin exact path="/petugas" component={petugas}></PrivateRouteAdmin>
      <PrivateRouteAdmin exact path="/history" component={history}></PrivateRouteAdmin>
    </Switch>
  );
}

export default App;
