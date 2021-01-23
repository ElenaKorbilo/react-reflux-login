import React from "react";
import Reflux from "reflux";
import UserStore from "./UserStore";
import Actions from "./actions.js";
import { Redirect } from "react-router-dom";

class LoginPage extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = UserStore;
  }

  onClick = () => {
    Actions.logout();
    this.props.history.push("/");
  };

  render() {
    return this.state.isAuth ? (
      <div>
        <p>Welcome!</p>
        <button onClick={this.onClick}>Quit</button>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default LoginPage;
