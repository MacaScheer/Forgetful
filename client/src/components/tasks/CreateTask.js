import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import "../stylesheets/create_task.scss";
import TagOption from "./TagOption";
import ListOption from "./ListOption";
const { ALL_TASKS } = Queries;
const { CREATE_TASK } = Mutations;

class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      listId: "",
      tagId: "",
      start: "",
      message: ""
    };
    this.renderTools = this.renderTools.bind(this);
    this.inputChar = this.inputChar.bind(this);
    this.stateBinder = this.stateBinder.bind(this);
    this.renderLists = this.renderLists.bind(this);
    this.renderButton = this.renderButton.bind(this);


  }

  stateBinder(key, value) {
    this.setState({key: value})
  }

  tools() {
    return (
      <div>
        <button onClick={this.inputChar} value="^">
          <i className="fas fa-calendar" value="^" />
        </button>{" "}
        {/* duedate*/}
        <button onClick={this.inputChar} value="*">
          <i className="fas fa-list" value="*" />
        </button>
        {/* list */}
        <button onClick={this.inputChar} value="@">
          <i className="fas fa-tags" value="@" />
        </button>
        {/* tag */}
      </div>
    );
  }

  renderTools() {
    return this.state.input.length > 0 ? this.tools() : <div />;
  }
  renderButton() {
    
    return this.state.input.length > 0 ? <button className="create-task-button">Add Task</button>: <div />;
  }
  renderLists() {
    const iArr = this.state.input.split("");
    const lastIndex = iArr.length - 1
    const lastChar = iArr[lastIndex];
    
    switch (lastChar) {
      case "*":
        return <ListOption stateBinder={this.stateBinder}/>;
      case "@":
        return <TagOption stateBinder={this.stateBinder}/>;
      default:
        return <div />;
    }
  }

  inputChar(e) {
    e.preventDefault();
    this.setState({ input: this.state.input.concat(e.currentTarget.value) });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    let tasks;
    try {
      tasks = cache.readQuery({ query: ALL_TASKS });
    } catch (err) {
      return;
    }
    if (tasks) {
      let tasksArray = tasks.tasks;
      let newTask = data.newTask;
      cache.writeQuery({
        query: ALL_TASKS,
        data: { tasks: tasksArray.concat(newTask) }
      });
    }
  }
  render() {
    return (
      <Mutation
        mutation={CREATE_TASK}
        onError={err => this.setState({ message: err.message })}
        update={(cache, data) => this.updateCache(cache, data)}
        onCompleted={data => {
          const { name } = data.newTask;
          this.setState({
            message: `new task ${name} created successfully`
          });
        }}
      >
        {(newTask, { data }) => (
          <div className="create-task-container">
            <form
              className="create-task-form"
              onSubmit={e => this.handleSubmit(e, newTask)}
            >
              <input
                className="create-task-input"
                onChange={this.update("input")}
                value={this.state.input}
                placeholder="Add a task..."
              />
              {this.renderTools()}
              {this.renderLists()}
              {this.renderButton()}
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
export default CreateTask;
