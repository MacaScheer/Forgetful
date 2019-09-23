import "../stylesheets/task_index.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
const { DELETE_TASK } = mutations;

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
    this.handleDelete = this.handleDelete;
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

  updateCache(cache, data) {
    let tasks;
    try {
      const id = localStorage.getItem('currentuserId')

      tasks = cache.readQuery({ query: FETCH_USER, variables: { Id: id } })
    } catch (err) {
      return
    }
  }

  handleDelete(e, deleteTask) {
    e.preventDefault();
    const taskId = this.props._id;
    debugger;
    deleteTask({ variables: { id: taskId } });
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
      <Mutation
        mutation={DELETE_TASK}
        onError={err => this.setState({ message: err.message })}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {deleteTask => (
          <div className="task-line-container">
            <form onSubmit={e => this.handleDelete(e, deleteTask)}>
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
        )}
      </Mutation>
    );
  }
}

export default CheckLine;
