import React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import { Link, withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
import "../stylesheets/greeting.scss";
const { IS_LOGGED_IN } = Queries;
class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.isNotLoggedIn = this.isNotLoggedIn.bind(this);
  }

  toggleDropdown() {
    const dropdown = document.getElementById("profile-dropdown");
    this.setState({
      hidden: !this.state.hidden
    });

    if (this.state.hidden) {
      dropdown.classList.remove("hide-dropdown");
    } else {
      dropdown.classList.add("hide-dropdown");
    }
  }

  isNotLoggedIn() {
    return (
      <div className="navbar-list">
        <ul className="navbar-list-items">
            <img className="logo" src={require("../splashpage/favicon1.ico")} />
          <li className="navbar-list-item">
            <Link to="/login">Log in</Link>
          </li>
          <li className="navbar-list-item">
            <Link to="/demo">Demo Login</Link>
          </li>
          <li className="navbar-list-item">
            <Link to="/signup">Sign up for free</Link>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                return (
                  <div className="greeting-container">
                    <div className="greeting">
                      Welcome back, {localStorage.getItem("name")}!{" "}
                    </div>
                    <button
                      className="logout-button"
                      onClick={e => {
                        e.preventDefault();
                        localStorage.removeItem("auth-token");
                        localStorage.removeItem("name");
                        localStorage.removeItem("defaultListObjectId");

                        localStorage.removeItem("currentuserId");
                        client.writeData({ data: { isLoggedIn: false } });
                        this.props.history.push("/splash");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                );
              } else {
                return this.isNotLoggedIn();
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(Greeting);
