import "../stylesheets/task_index.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Mutation } from "reac-apollo"
import mutations from "../../graphql/mutations"

class CheckLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      completed: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.incompleteTask = this.incompleteTask.bind(this);
  }

  handleChange(e) {
    this.setState({
      completed: !this.state.completed
    });
  }

  completeTask() {
    this.setState({
      completed: true
    });
  }

  incompleteTask() {
    this.setState({
      completed: false
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.getTaskId(this.props._id);
  }

  updateCache() { }
  

  renderDelete() {
    return this.state.completed ? (
      <button className="delete-task-button"
      onClick={this.handleDelete}>Delete Task</button>
    ) : (
      <div />
    );
  }

  render() {
    return (
      <Mutation mutationz={DELETE_TASK}
        onError={err => this.setState({ message: err.message })}
        update= {(cache, data) => this.updateCache(cache, data)}
      >

      <div className="task-line-container">
        <form>
          <input
            type="checkbox"
            checked={this.state.completed}
            onChange={e => {
              e.stopPropagation();
              this.state.completed
                ? this.incompleteTask()
                : this.completeTask();
            }}
          />
          <div id="task" className={this.state.completed ? "strike" : ""}>
            <p className="task-line-button" onClick={this.handleClick}>
              {this.props.name}
            </p>
            {this.renderDelete()}
          </div>
        </form>
        </div>
      </Mutation>
    );
  }
}

export default CheckLine;
