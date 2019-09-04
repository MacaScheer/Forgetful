import React, { Component } from 'react'

export default class TaskSummary extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { type, numOfTasks, numOfCompleted} = this.props 
    return (
      <div className="summary-container">
        <div className="summary-title">{type}</div>
        <div className="sum-count-box">
          <div className="sum-count-txt">
            {numOfTasks}
            <div className="sum-count-subtxt">tasks </div>
          </div>
        </div>
        <div className="sum-completed-box">
          <div className="sum-completed-txt">
            {numOfCompleted}
            <div className="sum-completed-subtxt">completed</div>
          </div>
        </div>
      </div>
    )
  }
}
