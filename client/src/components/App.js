import React from "react";
import { Switch, Link, Route, Redirect } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "../util/route_util";
import Login from "./sessions/Login";
import Signup from "./sessions/Signup";

import Nav from "./navbar/Navbar";
import TaskIndex from "./tasks/TaskIndex";
import CreateTask from "./tasks/CreateTask";
import TagOption from "./tasks/TagOption";
import ListOption from "./tasks/ListOption";
import SearchBar from "./navbar/SearchBar";
import DateOption from "./tasks/DateOption";
import TaskShow from "./tasks/TaskShow";

import SearchResults from "./tasks/SearchResults";
import DropDownMenu from "./navbar/DropDownMenu";
import LocationOption from "./tasks/LocationOption";
import SplashPage from "./splashpage/splashpage";
import { timingSafeEqual } from "crypto";
const path = require("path");

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      showDropdown: false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown() {
    this.setState({showDropdown: !this.state.showDropdown})
  }

 render(){ 
  return(
    <div>
      <Nav toggler={this.toggleDropdown} dropdown={this.state.showDropdown}/>
      {localStorage.getItem("auth-token") === null ? (
        <Redirect from="/" exact to="/splash" />
      ) : (
        <Redirect from="/" exact to="/all" />
      )}

      <Route path="/date" component={DateOption} />
      <Route exact path="/all/:id" component={TaskShow} />
      <Route path="/routetest" component={LocationOption} />
      <Route
        key="search"
        exact
        path="/search/:searchResults"
        component={TaskIndex}
      />
      <Route key="all" path="/all" component={TaskIndex} />
      <Route key="today" path="/today" component={TaskIndex} />
      <Route key="tomorrow" path="/tomorrow" component={TaskIndex} />
      <Route key="thisweek" path="/thisweek" component={TaskIndex} />
      <Route key="list" path="/lists/:list" component={TaskIndex} />
      <Route key="tags" path="/tags/:list" component={TaskIndex} />
      <Route key="location" path="/locations/:list" component={TaskIndex} />
      <Route key="trash" path="/trash/trash" component={TaskIndex} />
      <Route exact path="/tasks" component={TaskIndex} />
      <Route path="/create" component={CreateTask} />
      <Route path="/splash" component={SplashPage} />

      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/demo" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
      </Switch>
    </div>
  )
 }
}


export default App;
