import "../stylesheets/task_index.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { REMOVE_TASK } = Mutations;

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

  updateCache(cache, { data }) {
    try {
      const id = this.props.id;
    } catch (err) {
      return;
    }
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
    console.log("handleClick", this.props._id);
    this.props.getTaskId(this.props._id);
  }

  renderDelete() {
    return this.state.completed ? (
      <Mutation
        mutation={REMOVE_TASK}
        onError={err => this.setState({ message: err.message })}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(deleteTask, { data }) => (
          <button
            className="delete-task-button"
            onClick={e => {
              e.preventDefault();
              deleteTask({ variables: { id: this.props.id } });
            }}
          >
            Delete Task
          </button>
        )}
      </Mutation>
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
    );
  }
}

export default CheckLine;
