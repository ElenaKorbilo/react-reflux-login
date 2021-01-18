import Reflux from "reflux";
import Actions from "./actions.js";

class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      users: []
    };

    this.listener1 = this.listenTo(Actions.login, this.onLogin);
  }

  onLogin(user) {
    this.setState({ users: [...this.state.users, user] });
    console.log(this.state.users);
  }

  componentWillUnmount() {
    listener1.stop();
  }
}

export default UserStore;
