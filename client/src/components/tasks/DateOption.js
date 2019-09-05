import React, { Component } from "react";

export default class DateOption extends Component {
  render() {
    const dateObj = new Date();
    const intToParse = String(dateObj.getDate()).padStart(2, "0");
    const tomorrow = dateObj.setDate(intToParse);
    const twoDaysAfter = dateObj.setDate(intToParse + 1);
    const threeDaysAfter = dateObj.setDate(intToParse + 2);

    let dayOneName = tomorrow.toDateString().split(" ")[0];
    let dayTwoName = twoDaysAfter.toDateString().split(" ")[0];
    let dayThreeName = threeDaysAfter.toDateString().split("")[0];
    return (
      <div>
        <div>Today</div>
        <div>Tomorrow</div>
        <div>{dayOneName}</div>
        <div>{dayTwoName}</div>
        <div>{dayThreeName}</div>
        <div>Never</div>
        <div>SelectDate</div>
      </div>
    );
  }
}

//   letnextDate = today.setDate(nextDate)
