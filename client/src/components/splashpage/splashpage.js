import React from "react";
import "../stylesheets/greeting.scss";
import { Fade } from "react-slideshow-image";

class SplashNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fadeImages = [
      "images/postitgreen.jpeg",
      "images/postitpink.png",
      "images/postityellow.png"
    ];

    const fadeProperties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: false,
      indicators: true,
      onChange: (oldIndex, newIndex) => {
        console.log(`fade transition from ${oldIndex} to ${newIndex}`);
      }
    };
    return (
      <div className="splash-container">
      <div className="splash-background">
        
        {/* <div className="slide-container">
          <Fade {...fadeProperties}>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[0]} />
              </div>
              <h2>First Slide</h2>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[1]} />
              </div>
              <h2>Second Slide</h2>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[2]} />
              </div>
              <h2>Third Slide</h2>
            </div>
          </Fade>
        </div> */}
      </div>
      <div className="home-page-div-tags">
        <div className="splash-intro-prewords">Welcome to</div>
        <div className="splash-intro">Forgetful</div>
        {/* <div className="splash-description">We save ur tasks to different lists so you will never forget what you need to do!</div> */}
        <div className="splash-description">
          {" "}
          a task management application
          </div>
      </div>
      </div>
    );
  }
}

export default SplashNavbar;
