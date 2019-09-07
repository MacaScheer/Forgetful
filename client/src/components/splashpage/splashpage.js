import React from "react";
import "../stylesheets/greeting.scss";

class SplashNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img
        className="splash-page-image"
        src={
          "https://static.parade.com/wp-content/uploads/2016/06/findingdory568c691272fd3-72.jpg"
        }
      />
    );
  }
}

export default SplashNavbar;
