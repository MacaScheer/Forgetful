import "../stylesheets/task_index.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
const { FETCH_USER } = queries;
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
    if (this.props.taskId === this.props._id) {
      const showPage = document.getElementById("task-show");
    }
    this.props.selectTask(this.props._id);
  }

  updateCache(cache, { data }) {
    let tasks;
    // debugger
    try {
      const id = localStorage.getItem("currentuserId");

      tasks = cache.readQuery({ query: FETCH_USER, variables: { Id: id } });
    } catch (err) {
      return;
    }

    if (tasks) {
      const id = localStorage.getItem("currentuserId");
      let deletedTaskId = this.props._id;
      let objectIdx;
      // debugger
      // console.log('test')
      tasks.user.tasks.forEach((ele, idx) => {
        if (ele._id === deletedTaskId) objectIdx = idx;
      });
      // debugger
      tasks.user.tasks.splice(objectIdx, 1)
      // debugger
      // console.log(tasks.user.tasks.length);
      cache.writeQuery({
        query: FETCH_USER,
        variables: { Id: id },
        data: { user: tasks.user }
      });
    }
  }

  handleDelete(e, deleteTask) {
    e.preventDefault();
    const taskId = this.props._id;
    // debugger;
    deleteTask({ variables: { id: taskId } });
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
