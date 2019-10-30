import "../stylesheets/task_index.scss";
import React from "react";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
import merge from "lodash/merge";

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
    // this.props.selectTask = this.props.selectTask.bind(this);
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
    this.props.selectTask(this.props._id);
  }

  updateCache(cache, { data }) {
    let tasks;
    try {
      const id = localStorage.getItem("currentuserId");

      tasks = cache.readQuery({ query: FETCH_USER, variables: { Id: id } });
    } catch (err) {
      return;
    }

    if (tasks) {
      const id = localStorage.getItem("currentuserId");
      let deletedTaskId = this.props._id;
      let modifiedData;
      if (this.props.filterkey !== "start_date") {
        modifiedData = this.attributeUpdater(tasks.user, deletedTaskId);
        this.props.client.writeQuery({
          query: FETCH_USER,
          variables: { Id: id },
          data: { user: { [this.props.filterkey]: modifiedData } }
        });
      }

      let newTasks = tasks.user.tasks.filter(ele => {
        return ele._id !== deletedTaskId;
      });

      this.props.client.writeQuery({
        query: FETCH_USER,
        variables: { Id: id },
        data: { user: { tasks: newTasks } }
      });
    }
  }

  handleDelete(e, deleteTask) {
    e.preventDefault();
    const taskId = this.props._id;
    deleteTask({ variables: { id: taskId } }).then(() => {
      this.setState({ completed: false }, this.props.closer());
    });
  }

  renderDelete() {
    return this.state.completed ? (
      <button className="delete-task-button">Delete Task</button>
    ) : (
      <div />
    );
  }

  attributeUpdater(data, id) {
    const clonedData = merge([], data[this.props.filterkey]);
    let itemIdx;
    clonedData.forEach((ele, idx) => {
      if (ele.name === this.props.filtername) itemIdx = idx;
    });
    clonedData[itemIdx].tasks.forEach((ele, idx) => {
      if (ele._id === id) clonedData[itemIdx].tasks.splice(idx, 1);
    });
    return clonedData;
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
