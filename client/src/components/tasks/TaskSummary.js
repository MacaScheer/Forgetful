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
          isAll: this.props.isAll
        })
      : (this.state = {
          tasks: this.props.data
        });

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
        <div className="summary-title"></div>
        <div className="sum-count-box">
          <div className="sum-count-txt">
            {this.state.isAll ? (
              <div className="sum-count-subtxt">
                all tasks: {this.state.tasks.length}
              </div>
            ) : (
              <div className="sum-count-subtxt">
                tasks: {this.state.tasks.length}
              </div>
            )}
            {this.state.isAll ? (
              <div className="list-details">
                lists: {this.state.lists.length}
              </div>
            ) : (
              <div className="list-details"></div>
            )}

            {this.state.isAll ? (
              <div className="location-details">
                locations: {this.state.locations.length}
              </div>
            ) : (
              <div className="location-details"></div>
            )}
            <div className="due-tomorrow">due tomorrow: {dueTomorrow}</div>
          </div>
        </div>
        <div className="sum-completed-box">
          <div className="sum-completed-txt">
            <div className="sum-completed-subtxt">completed:</div>
          </div>
        </div>
      </div>
    );
  }
}
