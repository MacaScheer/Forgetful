import React, { Component } from "react";
import "../stylesheets/tasksummary.scss";

export default class TaskSummary extends Component {
  constructor(props) {
    super(props);
    this.props.isAll
      ? (this.state = {
          tasks: this.props.data,
          isAll: this.props.isAll
        })
      : (this.state = {
          tasks: this.props.data,
          group: this.props.group
        });

    this.state.group =
      this.props.group === "all"
        ? `${this.capitalize(this.props.group)} Tasks`
        : `${this.capitalize(this.props.group)}' Tasks`;
    this.dueDates = this.dueDates.bind(this);
  }
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  dueDates(tasks) {
    let today = new Date();
    let todayString = today.toDateString();
    let dayARR = todayString.split(" ");
    let dayINT = parseInt(dayARR[2]);
    let tomINT = dayINT + 1;
    let tomorrow = new Date();
    tomorrow.setDate(tomINT);
    let tomorrowString = tomorrow.toDateString();
    let dueToday = [];
    let dueTomorrow = [];
    tasks.forEach(task => {
      if (task.due_date === tomorrowString) dueTomorrow.push(task);
      if (task.due_date === todayString) dueToday.push(task);
    });
    return { dueToday: dueToday.length, dueTomorrow: dueTomorrow.length };
  }

  render() {
    let duedates = this.dueDates(this.state.tasks);
    return (
      <div className="summary-container" id="summary-container">
        <h2 className="summary-title" id="summary-title">
          {this.state.group}
        </h2>
        <br />
        <div className="sum-count-box" id="sum-count-box">
          <div className="sum-count">
            <div className="sum-count-txt">
              <div className="color-number">{this.state.tasks.length}</div>
              <div>tasks</div>
            </div>
          </div>
          <div className="sum-count-txt">
            <div className="list-details">
              <div className="color-number black">{duedates.dueToday}</div>
              <div>due today</div>
            </div>
          </div>

          <div className="due-tomorrow sum-count-txt">
            <div className="color-number red">{duedates.dueTomorrow}</div>
            <div>due tomorrow</div>
          </div>
          {/* <div className="sum-completed-box">
            <div className="sum-completed-txt"></div>
          </div> */}
        </div>
      </div>
    );
  }
}
