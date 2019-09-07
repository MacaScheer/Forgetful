import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "../stylesheets/dateoption.scss";

export default class DateOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      showDatePicker: false,
      dateDetail: ""
    };
    this.updateDate = this.updateDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleDatePicker = this.toggleDatePicker.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.inputAdder(this.state.dateDetail);
    this.props.type === "start_date"
      ? this.props.stateBinder({ start_date: this.state.date })
      : this.props.stateBinder({ due_date: this.state.date });
  }
  updateDate(e) {
    e.preventDefault();
    if (e.currentTarget.value === "never") {
      this.setState({ date: "Never", dateDetail: "Never" });
      return;
    }
    let target = e.currentTarget.value;
    let detail = target
      .split(" ")[1]
      .concat(" ")
      .concat(target.split(" ")[2]);
    this.setState({
      date: target,
      dateDetail: detail
    });
  }

  toggleDatePicker(e) {
    e.preventDefault();
    this.setState({ showDatePicker: !this.state.showDatePicker });
  }

  formatDate(dateObj) {
    let dateString = dateObj.toDateString();
    let dayARR = dateString.split(" ");
    let dayINT = parseInt(dayARR[2]);
    dayARR[2] = dayINT + 1;
    let newDateString = dayARR.join(" ");
    return newDateString;
  }

  handleChange = async date => {
    let newDate = this.formatDate(date.target.valueAsDate);
    let detail = newDate
      .split(" ")[1]
      .concat(" ")
      .concat(newDate.split(" ")[2]);
    if (typeof newDate === "string") {
      this.setState({
        date: newDate,
        dateDetail: detail
      });
    }
  };

  render() {
    let dateObj = new Date();
    let dateString = dateObj.toDateString();
    let dayARR = dateString.split(" ");
    let dayINT = parseInt(dayARR[2]);
    let todayFullString = dateObj.toDateString();
    let todayDateDetail = dateString
      .split(" ")[1]
      .concat(" ")
      .concat(dateString.split(" ")[2]);
    dateObj.setDate(dayINT + 1);
    const tomorrowFullString = dateObj.toDateString();
    const tomorrowDateDetail = tomorrowFullString
      .split(" ")[1]
      .concat(" ")
      .concat(tomorrowFullString.split(" ")[2]);
    dateObj.setDate(dayINT + 2);
    const dayTwoFullString = dateObj.toDateString();
    const dayTwoName = dayTwoFullString.split(" ")[0];
    const dayTwoDateDetail = dayTwoFullString
      .split(" ")[1]
      .concat(" ")
      .concat(dayTwoFullString.split(" ")[2]);
    dateObj.setDate(dayINT + 3);
    const dayThreeFullString = dateObj.toDateString();
    const dayThreeName = dayThreeFullString.split(" ")[0];
    const dayThreeDateDetail = dayThreeFullString
      .split(" ")[1]
      .concat(" ")
      .concat(dayThreeFullString.split(" ")[2]);
    dateObj.setDate(dayINT + 4);
    const dayFourFullString = dateObj.toDateString();
    const dayFourName = dayFourFullString.split(" ")[0];
    const dayFourDateDetail = dayFourFullString
      .split(" ")[1]
      .concat(" ")
      .concat(dayFourFullString.split(" ")[2]);

    return (
      <div className="date-option-container">
        <div className="label-container">
          <label className="label">
            {this.props.type === "start_date" ? (
              <p>Select a Start Date:</p>
            ) : (
              <p>Select a Due Date</p>
            )}
            <h3>{this.state.dateDetail}</h3>
          </label>
        </div>
        <br />
        <div className="calendar-button-container">
          <button
            className="calendar-button"
            onClick={this.updateDate}
            value={todayFullString}
            datename="Today"
            datedetail={todayDateDetail}
          >
            Today<div className="date-detail">{todayDateDetail}</div>
          </button>
          <button
            className="calendar-button"
            onClick={this.updateDate}
            value={tomorrowFullString}
            datename="Tomorrow"
            datedetail={tomorrowDateDetail}
          >
            Tomorrow<div className="date-detail">{tomorrowDateDetail}</div>
          </button>
          <button
            className="calendar-button"
            onClick={this.updateDate}
            value={dayTwoFullString}
            datename={dayTwoName}
            datedetail={dayTwoDateDetail}
          >
            {dayTwoName}
            <div className="date-detail">{dayTwoDateDetail}</div>
          </button>
          <button
            className="calendar-button"
            onClick={this.updateDate}
            value={dayThreeFullString}
            datename={dayThreeName}
            datedetail={dayThreeDateDetail}
          >
            {dayThreeName}
            <div className="date-detail">{dayThreeDateDetail}</div>
          </button>
          <button
            className="calendar-button"
            onClick={this.updateDate}
            value={dayFourFullString}
            datename={dayFourName}
            datedetail={dayFourDateDetail}
          >
            {dayFourName}
            <div className="date-detail">{dayFourDateDetail}</div>
          </button>
        </div>
        <div className="select-date-button-container">
          <div className="select-date">
            <button className="feature-buttons" onClick={this.toggleDatePicker}>
              Select Date
            </button>
            <div className="date-picker">
              {this.state.showDatePicker ? (
                <input type="date" onChange={this.handleChange} />
              ) : (
                <div />
              )}
            </div>
          </div>
          <button className="feature-buttons" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}
