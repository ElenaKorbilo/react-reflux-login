import React from "react";
import Reflux from "reflux";
import Actions from "./actions.js";
import UserStore from "./UserStore.js";
import { FormErrors } from "./FormErrors";

export default class Form extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
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

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let isUser = [];

    switch (fieldName) {
      case "email":
        isUser = this.state.users.filter(user => {
          return user.email === value;
        });

        emailValid = isUser.length != 0;
        fieldValidationErrors.email = emailValid ? "" : " do not registered";
        break;
      case "password":
        passwordValid = isUser[0].password === value;
        fieldValidationErrors.password = passwordValid ? "" : " is invalid";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }

  render() {
    return (
      <form>
        <div>
          <FormErrors formErrors={this.state.formErrors} />
        </div>
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
        <button type="submit" disabled={!this.state.formValid}>
          Sign Up
        </button>
      </form>
    );
  }
}
