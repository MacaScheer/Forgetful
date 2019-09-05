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
  }

  handleChange() {
    this.setState({
      completed: !this.state.completed
    });
  }

  renderDelete() {
    return this.state.completed ? <button className="delete-task-button">Delete Task</button> : <div />;
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
          <Link
            id="task"
            className={this.state.completed ? "strike" : ""}
            to={`/tasks/${this.props._id}`}
          >
            {this.props.name}
          </Link>
          {this.renderDelete()}
        </form>
      </div>
    );
  }
}

export default CheckLine;
