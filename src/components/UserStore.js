import Reflux from "reflux";
import { Redirect } from "react-router-dom";
import Actions from "./actions.js";

class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      users: [],
      isAuth: false
    };

    this.listener1 = this.listenTo(Actions.signIn, this.onSignIn);
    this.listener2 = this.listenTo(Actions.signUp, this.onSignUp);
  }

  onSignUp(user) {
    this.state.users.push(user);
    this.state.isAuth = true;
  }

  onSignIn() {
    this.state.isAuth = true;
  }

  componentWillUnmount() {
    listener1.stop();
    listener2.stop();
  }
}

module.exports = UserStore;
