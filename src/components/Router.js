import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import LoginPage from "./LoginPage";
import NavMenu from "./NavMenu";

export default function Router() {
  return (
    <div>
      <Router>
        <div>
          <NavMenu />
          <Switch>
            <Route exact path="/" component={SignInForm} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/protected" component={LoginPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
