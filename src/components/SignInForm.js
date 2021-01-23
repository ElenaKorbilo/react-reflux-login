import React from "react";
import Reflux from "reflux";
import Actions from "./actions.js";
import UserStore from "./UserStore.js";
import { FormErrors } from "./FormErrors";

export default class SignInForm extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: [],
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

  handleSubmit = e => {
    e.preventDefault();
    Actions.signIn();
    this.props.history.push("/protected");
    this.state = {
      email: "",
      password: "",
      user: [],
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let user = this.state.user;

    switch (fieldName) {
      case "email":
        user = this.state.users.filter(user => {
          return user.email === value;
        });

        emailValid = user.length != 0;
        fieldValidationErrors.email = emailValid ? "" : " do not registered";
        break;
      case "password":
        passwordValid = this.state.user[0].password === value;
        fieldValidationErrors.password = passwordValid ? "" : " is invalid";
        break;
      default:
        break;
    }

    this.setState(
      {
        user: user,
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
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-offset-3 col-md-3">
            <form
              onSubmit={this.handleSubmit.bind(this)}
              class="form-horizontal"
            >
              <div>
                <FormErrors formErrors={this.state.formErrors} />
              </div>
              <div class="form-group">
                <label htmlFor="email" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChangeInput.bind(this)}
                />
              </div>
              <div class="form-group">
                <label htmlFor="password" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChangeInput}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary mt-3"
                disabled={!this.state.formValid}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
