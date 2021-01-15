import Reflux from "reflux";
import Actions from "../actions.js";

class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.state = { users: [{ email: "", password: "" }] };

    this.listener1 = this.listenTo(Actions.login, this.onLogin);
  }

  onLogin(user) {
    console.log(user);
    console.log(this.state.users);
    this.setState({ users: [...this.state.users, user] });
  }

  componentWillUnmount() {
    listener1.stop();
  }
}

export default UserStore;
