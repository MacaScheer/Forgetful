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
      // console.log("start_date", task.start_date);

      if (
        task.due_date === tomorrowString ||
        task.start_date === tomorrowString
      ) {
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
          <div className="sum-count">
            {this.state.isAll ? (
              <div className="sum-count-txt">
                <div className="color-number">{this.state.tasks.length}</div>
                <div>tasks</div>
              </div>
            ) : (
              <div className="sum-count-txt">
                <div className="color-number">{this.state.tasks.length}</div>
                <div>tasks</div>
              </div>
            )}
          </div>
          <div className="sum-count-txt">
            {this.state.isAll ? (
              <div className="list-details">
                <div className="color-number black">
                  {this.state.lists.length}
                </div>
                <div>lists</div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="sum-count-txt">
            {this.state.isAll ? (
              <div className="location-details">
                <div className="color-number green">
                  {this.state.locations.length}
                </div>
                <div>locations</div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="due-tomorrow sum-count-txt">
            <div className="color-number red">{dueTomorrow}</div>
            <div>due tomorrow</div>
          </div>
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
