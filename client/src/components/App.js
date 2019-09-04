import React from "react";
import { Switch, Link, Route } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "../util/route_util";
import Login from "./sessions/Login";
import Signup from "./sessions/Signup";

import Nav from "./navbar/Navbar";
import TaskIndex from "./tasks/TaskIndex";
import CreateTask from "./tasks/CreateTask";
import TagOption from "./tasks/TagOption";
import ListOption from "./tasks/ListOption";
import SearchBar from "./navbar/SearchBar";
import SearchResults from "./tasks/SearchResults";

const App = () => {
  return (
    <div>
      <Nav />
      <Route exact path="/search/:searchResults" component={SearchResults} />
      <Route path="/all" component={TaskIndex} />
      <Route path="/lists/inbox" component={TaskIndex} />
      <Route path="/today" component={TaskIndex} />
      <Route path="/lists/:list" component={TaskIndex} />
      <Route exact path="/tasks" component={TaskIndex} />
      <Route path="/trash/trash" component={TaskIndex} />
      <Route path="/create" component={CreateTask} />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
      </Switch>
    </div>
  );
};

export default App;
