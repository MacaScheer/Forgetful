import "../stylesheets/task_index.scss";
import React from "react";
import { Link } from "react-router-dom";

class CheckLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      completed: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      completed: !this.state.completed
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.getTaskId(this.props._id);
  }

  renderDelete() {
    return this.state.completed ? (
      <button className="delete-task-button">Delete Task</button>
    ) : (
      <div />
    );
  }

  render() {
    return (
      <div className="task-line-container">
        <form>
          <input
            type="checkbox"
            checked={this.state.completed}
            onChange={this.handleChange}
          />
          <div id="task" className={this.state.completed ? "strike" : ""}>
            <p className="task-line-button" onClick={this.handleClick}>
              {this.props.name}
            </p>
            {this.renderDelete()}
          </div>
        </form>
      </div>
    );
  }
}

export default CheckLine;
