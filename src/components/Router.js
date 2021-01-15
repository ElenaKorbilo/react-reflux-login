import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import NavMenu from "./NavMenu";

export default function Router() {
  return (
    <div>
      <Router>
        <div>
          <NavMenu />
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/signup" component={SignUpForm} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
