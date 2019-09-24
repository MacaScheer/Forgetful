import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import "../stylesheets/session-form.scss";
import "../stylesheets/reset.scss";
const { LOGIN_USER } = Mutations;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token, name, defaultListObjectId, _id } = data.login;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("defaultListObjectId", defaultListObjectId);
          localStorage.setItem("currentuserId", _id);
          this.props.history.push("/all");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <div className="session-child">
            <form
              className="session-form"
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <h2 className="session-header">Log in to continue</h2>
              <div className="input-container">
                <input
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
              </div>
              <div className="input-container">
                <input
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="session-buttons">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
