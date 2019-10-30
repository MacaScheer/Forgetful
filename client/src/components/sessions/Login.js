import React, { Component } from "react";
import { ApolloConsumer, Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import "../stylesheets/session-form.scss";
import "../stylesheets/reset.scss";
import { withRouter } from "react-router-dom";
const { LOGIN_USER } = Mutations;



class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    const asyncLocalStorage = {
      setItem: function (key, value) {
        return Promise.resolve().then(function () {
          localStorage.setItem(key, value);
        });
      },
      getItem: function (key) {
        return Promise.resolve().then(function () {
          return localStorage.getItem(key);
        });
      }
    };
  }
  componentDidMount() {
    if (this.props.match.url === "/demo") {
      setTimeout(() => {
        this.demoLogin(this.props.demo);
      }, 500);
    }
  }

  demoLogin() {
    const email = "demo@demo.com";
    const password = "password123";
    const typeSpeed = 60;
    for (let i = 0; i < email.length; i++) {
      setTimeout(() => {
        this.setState({ email: this.state.email + email[i] });
      }, i * typeSpeed);
    }
    for (let j = 0; j < password.length; j++) {
      setTimeout(() => {
        this.setState({ password: this.state.password + password[j] });
      }, email.length * typeSpeed + j * typeSpeed);
    }
    setTimeout(() => {
      document.getElementById("submitbtn").click();
    }, email.length * typeSpeed + password.length * typeSpeed + typeSpeed);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: {
        isLoggedIn: data.login.loggedIn,
        _id: data.login._id
      }
    });
  }

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <Mutation
              mutation={LOGIN_USER}
              onCompleted={data => {
                
                const { token, name, defaultListObjectId, _id } = data.login;
                localStorage.setItem("auth-token", token);
                localStorage.setItem("name", name);
                localStorage.setItem(
                  "defaultListObjectId",
                  defaultListObjectId
                );
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
                      <button id="submitbtn" type="submit">
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </Mutation>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default withRouter(Login);
