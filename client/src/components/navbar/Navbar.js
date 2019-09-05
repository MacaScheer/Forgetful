import React from "react";
import Greeting from "./Greeting";
import "../stylesheets/greeting.scss";
import DropDownMenu from "./DropDownMenu";
import SearchBar from "./SearchBar";

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
    const container = document.getElementById("st-container");

    this.setState({
      showDropdown: !this.state.showDropdown
    });

    if (!this.state.showDropdown) {
      container.classList.remove("slide");
      container.classList.add("new-slide");
    } else {
      container.classList.remove("new-slide");
      container.classList.add("slide");
    }
  }

  render() {
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
  }
}

export default Navbar;
