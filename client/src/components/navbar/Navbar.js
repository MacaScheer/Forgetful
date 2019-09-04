import React from "react";
import Greeting from "./Greeting";
import "../stylesheets/greeting.scss";
import DropDownMenu from "./DropDownMenu";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: "",
      showDropdown: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(e) {
    e.preventDefault();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  render() {
    const { showDropdown } = this.state;
    return (
      <div className="toolbar">
        <nav className="toolbar__navigation">
          <button onClick={this.toggleDropdown}>All Tasks </button>
          <div />
          <div className="toolbar__logo">
            <a href="/">ICON</a>
          </div>
          {/* <SearchBar queryString={this.state.queryString}/> */}
          <div className="spacer" />
          <div className="toolbar-navigation-items">
            <Greeting />
          </div>
        </nav>
        {showDropdown ? <DropDownMenu /> : <div />}
      </div>
    );
  }
}

export default Navbar;
