import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./views/Home";
import AddUser from "./views/AddUser";
import RemoveUser from "./views/RemoveUser"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route 
        path="/addUser"
        exact
        render={ props => <AddUser {...props} /> } />
      <Route
        path="/removeUser"
        exact
        render={ props => <RemoveUser {...props} />} />
    </Switch>
  </BrowserRouter>
  ,document.getElementById('root')
);
