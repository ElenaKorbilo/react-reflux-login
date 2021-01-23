import Reflux from "reflux";
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
    this.listener3 = this.listenTo(Actions.logout, this.onLogout);
  }

  onSignIn() {
    this.state.isAuth = true;
  }

  onSignUp(user) {
    this.state.users.push(user);
    this.state.isAuth = true;
  }

  onLogout() {
    this.state.isAuth = false;
  }

  componentWillUnmount() {
    listener1.stop();
    listener2.stop();
  }
}

export default UserStore;
