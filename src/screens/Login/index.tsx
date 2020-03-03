import { Auth } from "aws-amplify";
import React, { Component } from "react";
import { ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./index.css";

class Login extends Component {
  state = {
    isLoading: false,
    email: "",
    password: "",
  };

  validateForm = () => (this.state.email.length && this.state.password.length)

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    const { email: username, password } = this.state;

    try {
      await Auth.signIn({ username, password });

      this.handleLoginSuccess();
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  };

  handleLoginSuccess = () => this.props.userHasAuthenticated(true);

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in..."
          />
        </form>
      </div>
    );
  }
}

export default Login;
