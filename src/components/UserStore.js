import Reflux from "reflux";
import { Redirect } from "react-router-dom";
import Actions from "./actions.js";

class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      users: []
    };

    this.listener1 = this.listenTo(Actions.login, this.onLogin);
    this.listener2 = this.listenTo(Actions.signUp, this.onSignUp);
  }

  onLogin(user) {
    this.state.users.push(user);
    console.log(this.state.users);
  }

  onSignUp(user) {
    <Redirect to="/protected" />;
  }

  componentWillUnmount() {
    listener1.stop();
    listener2.stop();
  }
}

module.exports = UserStore;
