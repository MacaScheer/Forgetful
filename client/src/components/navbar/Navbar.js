import React from "react";
import Greeting from "./Greeting";
import "../stylesheets/greeting.scss";
import SearchBar from "./SearchBar";
import DropDownMenu from './DropDownMenu'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: true,
    }
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown(e) {
    e.preventDefault();
    return e => this.setState({ showDropdown: !this.state.showDropdown });

  }
  render() {
    const {showDropdown} = this.state
    return (
      <div className="toolbar">
        <nav className="toolbar__navigation">
          <button onClick={this.toggleDropdown}>hamburger </button>
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
        <SearchBar />
        { showDropdown ? <DropDownMenu/> : <div/>}
      </div>
    );
  }
}

export default Navbar;
