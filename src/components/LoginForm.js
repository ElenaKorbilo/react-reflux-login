import React from "react";
import Reflux from "reflux";
import Actions from "../actions.js";
import UserStore from "./UserStore.js";

class LoginForm extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confPass: "",
      formErrors: { email: "", password: "", confPass: "" },
      emailValid: false,
      passwordValid: false,
      confPassValid: false,
      formValid: false
    };
    this.store = UserStore;
  }

  handleChangeInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleSubmit = () => {
    Actions.login({ email: this.state.email, password: this.state.password });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confPassValid = this.state.confPassValid;
    console.log(fieldName);

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "confPass":
        confPassValid = confPass === password ? true : false;
        fieldValidationErrors.confPass = confPassValid ? "" : " is invalid";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        confPassValid: confPassValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.confPassValid
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChangeInput.bind(this)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChangeInput}
          />
        </div>
        <div>
          <label htmlFor="confPass">Confirm Password</label>
          <input
            type="password"
            name="confPass"
            value={this.state.confPass}
            onChange={this.handleChangeInput}
          />
        </div>
        <button type="submit" disabled={!this.state.formValid}>
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
