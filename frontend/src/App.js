import React from "react";
import { Switch, Route } from 'react-router-dom'
import barang  from './router/barang'
import lelang  from './router/lelang'
import petugas  from './router/petugas'
import dashboard  from './router/dashboard'
import Login from './components/form/login'
import Register from './components/form/register'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login}></Route>
      <Route exact path='/register' component={Register}></Route>
      <Route exact path='/dashboard' component={dashboard}></Route>
      <Route exact path='/barang' component={barang}></Route>
      <Route exact path='/lelang' component={lelang}></Route>
      <Route exact path='/petugas' component={petugas}></Route>
    </Switch>
  );
}

export default App;
