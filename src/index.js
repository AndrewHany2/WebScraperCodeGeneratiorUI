import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";
// core components
import WebScraperGenerator from "layouts/WebScraperGenerator.js";
import RTL from "layouts/RTL.js";
import login from "components/sign-in/SignIn";
import SignUp from "components/sign-up/SignUp";
import home from "layouts/home";
import GenerateSchema from "views/GenerateSchema/GenerateSchema";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import { UserProfile } from "views/UserProfile/UserProfile.js";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/WebScraperGenerator" component={WebScraperGenerator} />
      <Route path="/login" component={login} />
      <Route path="/generate" component={GenerateSchema} />
      <Route path="/signup" component={SignUp} />
      <Redirect
        from="/WebScraperGenerator"
        to="/WebScraperGenerator/dashboard"
      />
      <Redirect from="/" to="/login" component={login} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
