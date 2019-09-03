import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import "../stylesheets/session-form.scss";
const { REGISTER_USER } = Mutations;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token, name, defaultListObjectId, _id } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("defaultListObjectId", defaultListObjectId);
          localStorage.setItem("currentuserId", _id)

          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div className="session-child">
            <form
              className="session-form"
              onSubmit={e => {
                e.preventDefault();
                registerUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                  }
                });
              }}
            >
              <h2 className="session-header">Sign up for free.</h2>
              <div className="input-container">
                <input
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
              </div>
              <div className="input-container">
                <input
                  value={this.state.name}
                  onChange={this.update("name")}
                  placeholder="Name"
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
              <button type="submit">Sign up!</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup;
