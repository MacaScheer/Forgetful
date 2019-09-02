import React from "react";
import { Switch, Link, Route } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "../util/route_util";
import Login from "./sessions/Login";
import Signup from "./sessions/Signup";
import Nav from './navbar/Navbar';
import TaskIndex from './tasks/TaskIndex'
import CreateTask from './tasks/CreateTask'
const App = () => {
  return (
    <div>
      <Nav />
      <Route exact path="/tasks" component={TaskIndex} />
      <Route path='/create' component={CreateTask} />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
      </Switch>
    </div>
  );
};

export default App;
