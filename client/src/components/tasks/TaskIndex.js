import "../stylesheets/task_index.scss";
import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
import Taskline from "./TaskLine";
import CreateTask from "./CreateTask";
import TaskSummary from "./TaskSummary";
import Fuse from "fuse.js";
const { FETCH_USER } = Queries;

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    const URL = this.props.history.location.pathname;
    let URLArray = URL.split("/").filter(Boolean);
    let key;
    let input;
    if (URLArray.length > 1) {
      key = URLArray[0];
      input = URLArray[1];
    } else {
      input = URLArray[0];
      URLArray[0] === "trash" ? (key = "trash") : (key = "due_date");
    }
    const trigger = URLArray[0] === "all" ? false : true;
    this.state = {
      hidden: true,
      completed: false,
      keys: key,
      input: input,
      trigger: trigger,
      urlLength: URLArray.length
      
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.runSearch = this.runSearch.bind(this);
  }

  runSearch(data) {
    const check = this.state.urlLength === 1;
    const modifiedData = check ? data.tasks : data[this.state.keys];
    let input = this.state.input;
    const filterKey = check ? this.state.keys : "name";
    const options = {
      keys: [filterKey],
      shouldSort: true,
      tokenize: true,
      findAllMatches: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1
    };
    let fuse = new Fuse(modifiedData, options);
  
    if (check) return fuse.search("never") // stuff 
    debugger
    const result = input === "trash" ? fuse.list : fuse.search(input)[0]["tasks"];

    return result;
  }

  

  toggleDropdown() {
    const dropdown = document.getElementById("profile-dropdown");
    this.setState({
      hidden: !this.state.hidden
    });

    if (this.state.hidden) {
      dropdown.classList.remove("hide-dropdown");
    } else {
      dropdown.classList.add("hide-dropdown");
    }
  }

  handleChange(e) {
    e.preventDefault();

    this.setState({
      completed: !this.state.completed
    });
  }

  render() {
    const cid = localStorage.getItem("currentuserId");
    const trigger = this.state.trigger;
    return (
      <Query query={FETCH_USER} variables={{ Id: cid }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user.tasks) {
            return (
              <div className="task-index">
                <div className="task-index-container">
                  <div className="create-task-wrapper">
                    <CreateTask />
                  </div>
                  <div className="task-list-container">
                    <div className="task-list">
                      {trigger
                        ? this.runSearch(data.user).map((task, i) => (
                            <div className="task-list-item" key={i}>
                              <Taskline _id={task._id} name={task.name} />
                            </div>
                          ))
                        : data.user.tasks.map((task, i) => (
                            <div className="task-list-item" key={i}>
                              <Taskline _id={task._id} name={task.name} />
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
                <TaskSummary />
              </div>
            );
          } else {
            return null;
          }
        }}
      </Query>
    );
  }
}

export default withRouter(TaskIndex);
