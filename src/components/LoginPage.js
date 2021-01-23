import React from "react";
import Reflux from "reflux";
import UserStore from "./UserStore";

class LoginPage extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = UserStore;
  }

  render() {
    return this.state.isAuth ? (
      <div>
        <p>Welcome!</p>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default LoginPage;
