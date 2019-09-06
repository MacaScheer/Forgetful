import React from "react";
import Greeting from "../../navbar/Greeting"
import "../../stylesheets/greeting.scss"


class SplashNavbar extends React.Component {
  constructor(props) {
    super(props);
    
  }

  

  render() {
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
}

export default SplashNavbar;
