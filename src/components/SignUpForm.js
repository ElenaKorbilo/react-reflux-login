import React from "react";
import Reflux from "reflux";
import Actions from "./actions.js";
import UserStore from "./UserStore.js";
import { FormErrors } from "./FormErrors";

class SignUpForm extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confPass: "",
      formErrors: { email: "", password: "", confPass: "", user: "" },
      emailValid: false,
      passwordValid: false,
      confPassValid: false,
      userValid: false,
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
    Actions.signUp({ email: this.state.email, password: this.state.password });
    this.props.history.push("/protected");
    this.setState({
      email: "",
      password: "",
      confPass: "",
      formErrors: { email: "", password: "", confPass: "", user: "" },
      emailValid: false,
      passwordValid: false,
      confPassValid: false,
      userValid: false,
      formValid: false
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confPassValid = this.state.confPassValid;
    let userValid = this.state.userValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";

        let isUser = this.state.users.filter(user => {
          return user.email === value;
        });
        userValid = isUser.length === 0;
        fieldValidationErrors.user = userValid ? "" : " already registered";

        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "confPass":
        confPassValid = value === this.state.password ? true : false;
        fieldValidationErrors.confPass = confPassValid ? "" : " do not match";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        userValid: userValid,
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
        this.state.confPassValid &&
        this.state.userValid
    });
  }

  render() {
    return (
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-offset-3 col-md-3">
            <form onSubmit={this.handleSubmit} class="form-horizontal">
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
              <div class="form-group">
                <label htmlFor="confPass" class="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  name="confPass"
                  value={this.state.confPass}
                  onChange={this.handleChangeInput}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary mt-3"
                disabled={!this.state.formValid}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
