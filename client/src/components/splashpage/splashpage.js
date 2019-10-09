import React from "react";
import "../stylesheets/greeting.scss";

class SplashNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <img
      //   className="splash-page-image"
      //   src={
      //     "https://static.parade.com/wp-content/uploads/2016/06/findingdory568c691272fd3-72.jpg"
      //   }
      // />
      <div className="home-page-div-tags">
        <div className="splash-intro-prewords">Welcome to</div>
        <div className="splash-intro">Forgetful</div>
        <img className="logo" src={require("./favicon1.ico")} />
        {/* <div className="splash-description">We save ur tasks to different lists so you will never forget what you need to do!</div> */}
        <div className="splash-description">
          {" "}
          a task management application
        </div>
      </div>
    );
  }
}

export default SplashNavbar;
