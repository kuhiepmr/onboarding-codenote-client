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

  isValidForm = () => (this.state.email.length && this.state.password.length)

  handleFieldChange = ({ target }) => {
    const { id, value } = target;

    this.setState({
      [id]: value
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
    const { email, password, isLoading } = this.state;

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={password}
              onChange={this.handleFieldChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.isValidForm()}
            type="submit"
            isLoading={isLoading}
            text="Login"
            loadingText="Logging in..."
          />
        </form>
      </div>
    );
  }
}

export default Login;
