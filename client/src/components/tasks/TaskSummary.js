import React, { Component } from "react";
import "../stylesheets/tasksummary.scss";

export default class TaskSummary extends Component {
  constructor(props) {
    super(props);

    this.props.isAll
      ? (this.state = {
          data: this.props.data,
          tasks: this.props.data.user.tasks,
          tags: this.props.data.user.tags,
          lists: this.props.data.user.lists,
          trash: this.props.data.user.trash,
          locations: this.props.data.user.locations,
          isAll: this.props.isAll,
          group: this.props.group
        })
      : (this.state = {
          tasks: this.props.data,
          group: this.props.group
        });
    if (this.props.group === "tomorrow") this.state.group = "Tomorrow's Tasks";
    if (this.props.group === "thisweek") this.state.group = "This Week's Tasks";
    if (this.props.group === "today") this.state.group = "Today's Tasks";
    if (this.props.group === "all") this.state.group = "All Tasks";
    this.dueTomorrow = this.dueTomorrow.bind(this);
  }

  dueTomorrow(tasks) {
    let today = new Date();
    let todayString = today.toDateString();
    let dayARR = todayString.split(" ");
    let dayINT = parseInt(dayARR[2]);
    let tomINT = dayINT + 1;
    today.setDate(tomINT);
    let tomorrowString = today.toDateString();
    let taskList = [];
    tasks.forEach(task => {
      if (task.due_date === tomorrowString) {
        taskList.push(task);
      }
    });
    return taskList.length;
  }
  render() {
    let dueTomorrow = this.state.tasks
      ? this.dueTomorrow(this.state.tasks)
      : null;
    return (
      <div className="summary-container" id="summary-container">
        <h2 className="summary-title" id="summary-title">
          {this.state.group}
        </h2>
        <br />
        <div className="sum-count-box" id="sum-count-box">
          <div className="sum-count-txt">
            {this.state.isAll ? (
              <div className="sum-count-subtxt">
                tasks: {this.state.tasks.length}
              </div>
            ) : (
              <div className="sum-count-subtxt">
                tasks: {this.state.tasks.length}
              </div>
            )}
          </div>
          <div className="sum-count-txt">
            {this.state.isAll ? (
              <div className="list-details">
                lists: {this.state.lists.length}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="sum-count-txt">
            {this.state.isAll ? (
              <div className="location-details">
                locations: {this.state.locations.length}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="due-tomorrow">due tomorrow: {dueTomorrow}</div>

          <div className="sum-completed-box">
            <div className="sum-completed-txt">
              {/* <div className="sum-completed-subtxt">completed:
  
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
