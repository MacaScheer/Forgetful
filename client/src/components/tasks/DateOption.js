import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "../stylesheets/dateoption.scss";

export default class DateOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      showDatePicker: false
    };
    this.updateDate = this.updateDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleDatePicker = this.toggleDatePicker.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  updateDate(e) {
    e.preventDefault();
    this.setState({ date: e.target.value });
  }

  toggleDatePicker(e) {
    e.preventDefault();
    this.setState({ showDatePicker: !this.state.showDatePicker });
  }

  formatDate(dateObj) {
    return dateObj.toDateString();
  }

  handleChange = async date => {
    let newDate = this.formatDate(date.target.valueAsDate);
    if (typeof newDate === "string") {
      this.setState({
        date: newDate
      });
    }
  };

  render() {
    let dateObj = new Date();
    let dateString = dateObj.toDateString();
    let dayARR = dateString.split(" ");
    let dayINT = parseInt(dayARR[2]);
    let todayFullString = dateObj.toDateString();

    dateObj.setDate(dayINT + 1);
    const tomorrowFullString = dateObj.toDateString();
    // const tomorrowName = tomorrowFullString.split(" ")[0];

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
        <label>
          {typeof this.state.date === "object"
            ? this.formatDate(this.state.date)
            : this.state.date}
        </label>
        <br />
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
        <button onClick={this.toggleDatePicker}>Select Date</button>
        <div className="date-picker">
          {this.state.showDatePicker ? (
            // <DatePicker
            //   className="date-picker-selector"
            //   // selected={this.state.date}
            //   // onSelect={this.handleChange}
            //   onChange={this.handleChange}
            // />
            <input type="date" onChange={this.handleChange} />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}
