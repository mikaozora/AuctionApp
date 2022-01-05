import React from "react";
import { Switch, Route } from 'react-router-dom'
import barang  from './router/barang'
import lelang  from './router/lelang'
import petugas  from './router/petugas'
import dashboard  from './router/dashboard'

function App() {
  return (
    <Switch>
      <Route exact path='/dashboard' component={dashboard}></Route>
      <Route exact path='/barang' component={barang}></Route>
      <Route exact path='/lelang' component={lelang}></Route>
      <Route exact path='/petugas' component={petugas}></Route>
    </Switch>
  );
}

export default App;
