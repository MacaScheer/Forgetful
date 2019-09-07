import "../stylesheets/task_index.scss";
import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
import Taskline from "./TaskLine";
import CreateTask from "./CreateTask";
import TaskSummary from "./TaskSummary";
import Fuse from "fuse.js";
import TaskShow from "./TaskShow";
import { isThisSecond } from "date-fns";
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
      URLArray[0] === "trash" ? (key = "trash") : (key = "start_date");
    }
    const trigger = URLArray[0] === "all" ? false : true;
    this.state = {
      hidden: true,
      completed: false,
      keys: key,
      input: input,
      trigger: trigger,
      urlLength: URLArray.length,
      url: URL,
      showPage: false,
      taskId: "",
      localTasks: []
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.runSearch = this.runSearch.bind(this);
    this.getTaskId = this.getTaskId.bind(this);
  }

  getTaskId(task_id) {
    this.setState({
      taskId: task_id
    });
  }

  runSearchResult(tasks) {
    let input = localStorage.getItem("userInput");
    const options = {
      keys: ["due_date", "body", "name"],
      shouldSort: true,
      tokenize: true,
      findAllMatches: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1
    };
    let fuse = new Fuse(tasks.tasks, options);
    let result = fuse.search(input);
    return result;
  }

  runSearch(data) {
    if (this.state.keys === "search") return this.runSearchResult(data);
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
    if (check) {
      let today = new Date();
      let todayString = today.toDateString();
      let dayARR = todayString.split(" ");
      let weekDayString = dayARR[0];
      let dayINT = parseInt(dayARR[2]);
      let tomINT = dayINT + 1;
      let nextDATE;
      let taskList = [];
      let dueDateList = [];
      if (input === "today") {
        dueDateList.push(todayString);
      }
      if (input === "tomorrow") {
        today.setDate(tomINT);
        let tomorrowString = today.toDateString();
        dueDateList.push(tomorrowString);
      }
      if (input === "thisweek") {
        let numsARR = [];
        if (weekDayString === "Sun") {
          numsARR = [0, 1, 2, 3, 4, 5, 6, 7];
        } else if (weekDayString === "Mon") {
          numsARR = [0, 1, 2, 3, 4, 5, 6];
        } else if (weekDayString === "Tues") {
          numsARR = [0, 1, 2, 3, 4, 5];
        } else if (weekDayString === "Wed") {
          numsARR = [0, 1, 2, 3, 4];
        } else if (weekDayString === "Thurs") {
          numsARR = [0, 1, 2, 3];
        } else if (weekDayString === "Fri") {
          numsARR = [0, 1, 2];
        } else if (weekDayString === "Sat") {
          numsARR = [0, 1];
        }
        numsARR.forEach(num => {
          today.setDate(dayINT + num);
          let weekString = today.toDateString();
          dueDateList.push(weekString);
        });
      }
      fuse.list.forEach(task => {
        let due_date = task.due_date;
        if (dueDateList.includes(due_date)) {
          taskList.push(task);
        }
      });
      return taskList;
    }

    const result =
      input === "trash" ? fuse.list : fuse.search(input)[0]["tasks"];
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

  handleClick(e) {
    e.preventDefault();
    this.setState({
      showPage: !this.state.showPage
    });

    const showPage = document.getElementById("task-show");
    if (!this.state.showPage) {
      showPage.classList.remove("show-move-right");
      showPage.classList.add("show-move-left");
    } else {
      showPage.classList.remove("show-move-left");
      showPage.classList.add("show-move-right");
    }
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
            const summary = this.runSearch(data.user);
            return (
              <div className="task-index-container">
                <div className="task-index-wrapper">
                  <div className="task-index-page">
                    <div className="task-index-page-content">
                      <div className="right-side move-right" id="right-side">
                        <div className="task-summary-container">
                          <div className="task-summary" id="task-summary">
                            {trigger ? (
                              <TaskSummary
                                group={this.state.input}
                                isAll={false}
                                data={summary}
                              />
                            ) : (
                              <TaskSummary
                                group={this.state.input}
                                isAll={true}
                                data={data}
                              />
                            )}
                          </div>
                        </div>
                        <div className="task-show-container">
                          <div
                            className="task-show-page show-move-right"
                            id="task-show"
                          >
                            {this.state.taskId.length > 1 ? (
                              <TaskShow taskId={this.state.taskId} />
                            ) : (
                              <div />
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="tasks-container move-right"
                        id="tasks-container"
                      >
                        <div className="create-task-container">
                          <div className="create-task-wrapper">
                            <CreateTask />
                          </div>
                        </div>
                        <div className="task-list-container">
                          <div className="task-list">
                            {trigger
                              ? this.runSearch(data.user).map((task, i) => (
                                  <div>
                                    <div
                                      onClick={this.handleClick}
                                      className="task-list-item"
                                      key={i}
                                    ></div>
                                    <Taskline
                                      url={this.state.url}
                                      _id={task._id}
                                      name={task.name}
                                      getTaskId={this.getTaskId}
                                    />
                                  </div>
                                ))
                              : data.user.tasks.map((task, i) => (
                                  <div>
                                    <div
                                      onClick={this.handleClick}
                                      className="task-list-item"
                                      key={i}
                                    ></div>
                                    <Taskline
                                      url={this.state.url}
                                      _id={task._id}
                                      name={task.name}
                                      getTaskId={this.getTaskId}
                                    />
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
