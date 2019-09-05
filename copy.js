import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "../stylesheets/dateoption.scss";

export default class DateOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };
    this.updateDate = this.updateDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateDate(e) {
    e.preventDefault();
    this.setState({ date: e.target.value });
  }

  handleChange = date => {
    let newDate = date.toDateString();
    debugger;
    this.setState({
      date: newDate
    });
  };

  render() {
    let dateObj = new Date();
    let dateString = dateObj.toDateString();
    let dayARR = dateString.split(" ");
    let dayINT = parseInt(dayARR[2]);

    let todayFullString = dateObj.toDateString();

    dateObj.setDate(dayINT + 1);
    const tomorrowFullString = dateObj.toDateString();
    const tomorrowName = tomorrowFullString.split(" ")[0];

    dateObj.setDate(dayINT + 2);
    const dayTwoFullString = dateObj.toDateString();
    const dayTwoName = dayTwoFullString.split(" ")[0];

    dateObj.setDate(dayINT + 3);
    const dayThreeFullString = dateObj.toDateString();
    const dayThreeName = dayThreeFullString.split(" ")[0];

    dateObj.setDate(dayINT + 4);
    const dayFourFullString = dateObj.toDateString();
    const dayFourName = dayFourFullString.split(" ")[0];

    return (
      <div className="date-option-container">
        <div>{this.state.date}</div>
        <button onClick={this.updateDate} value={todayFullString}>
          Today
        </button>
        <button onClick={this.updateDate} value={tomorrowFullString}>
          Tomorrow
        </button>
        <button onClick={this.updateDate} value={dayTwoFullString}>
          {dayTwoName}
        </button>
        <button onClick={this.updateDate} value={dayThreeFullString}>
          {dayThreeName}
        </button>
        <button onClick={this.updateDate} value={dayFourFullString}>
          {dayFourName}
        </button>
        <button onClick={this.updateDate} value={"never"}>
          Never
        </button>
        <label className="date-picker">
          Select Date
          <DatePicker selected={this.state.date} onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}
