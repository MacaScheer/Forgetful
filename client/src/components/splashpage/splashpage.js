import React from "react";
import "../stylesheets/greeting.scss";
// import Navbar from "./splashbar/Navbar";

class SplashNavbar extends React.Component {
    constructor(props) {
        super(props);
        
        
    }



    render() {
        return (
            <img className="home-image" src={'https://pics.me.me/the-thinker-1880-the-thinker-2012-the-thinker-11420721.png'} />
        );
    }
}

export default SplashNavbar;
