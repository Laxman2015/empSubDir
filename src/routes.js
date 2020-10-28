import React from "react";
import App from "./App";
import { Switch, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

const appRoute = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route component={ErrorPage} />
  </Switch>
);

export default appRoute;
