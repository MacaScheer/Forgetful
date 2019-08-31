import React from "react";
import Greeting from "./Greeting";
import "../stylesheets/greeting.scss";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: ""
    }
  }
  render() {
    return (
      <div className="toolbar">
        <nav className="toolbar__navigation">
          <div />
          <div className="toolbar__logo">
            <a href="/">ICON</a>
          </div>
          {/* <SearchBar queryString={this.state.squeryString}/> */}
          <div className="spacer" />
          <div className="toolbar-navigation-items">
            <Greeting />
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
