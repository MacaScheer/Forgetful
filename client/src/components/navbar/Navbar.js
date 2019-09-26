import React from "react";
import Greeting from "./Greeting";
import { ApolloConsumer, Query } from "react-apollo";
import "../stylesheets/greeting.scss";
import DropDownMenu from "./DropDownMenu";
import SearchBar from "./SearchBar";
import Queries from "../../graphql/queries";
const { IS_LOGGED_IN } = Queries;

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(e) {
    e.preventDefault();
    const container =  document.getElementById("st-container");
   const tasks =  document.getElementById("tasks-container");
   const summary =  document.getElementById("right-side");
    this.setState({
      showDropdown: !this.state.showDropdown
    });

    if (!this.state.showDropdown) {
      container.classList.remove("slide");
      tasks.classList.remove("move-left");
      summary.classList.remove("move-left");
      container.classList.add("new-slide");
      summary.classList.add("move-right");
      tasks.classList.add("move-right");
    } else {
      tasks.classList.remove("move-right");
      summary.classList.remove("move-right");
      container.classList.remove("new-slide");
      container.classList.add("slide");
      tasks.classList.add("move-left");
      summary.classList.add("move-left");
    }
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                return (
                  <div className="toolbar">
                    <nav className="toolbar__navigation">
                      <div className="menu-wrap">
                        <div className="st-container">
                          <div id="st-trigger-effects">
                            <button
                              onClick={this.toggleDropdown}
                              className="all-tasks-button"
                              data-effect="st-effect-13"
                            >
                              <div className="hamburger">
                                <div></div>
                              </div>
                              <p>All Tasks</p>{" "}
                            </button>
                          </div>
                        </div>
                        <div />
                      </div>
                      <SearchBar queryString={this.state.queryString} />
                      <div className="spacer" />
                      <div className="toolbar-navigation-items">
                        <Greeting />
                      </div>
                    </nav>
                    <DropDownMenu />
                  </div>
                );
              } else {
                return (
                  <div className="toolbar">
                    <nav className="toolbar__navigation">
                      <div className="toolbar-navigation-items">
                        <Greeting />
                      </div>
                    </nav>
                  </div>
                );
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default Navbar;
