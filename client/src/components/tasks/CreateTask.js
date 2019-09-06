import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import "../stylesheets/create_task.scss";
import TagOption from "./TagOption";
import ListOption from "./ListOption";
import LocationOption from "./LocationOption";
import DateOption from "./DateOption";
const { ALL_TASKS } = Queries;
const { CREATE_TASK } = Mutations;

class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      listId: "",
      tagId: "",
      locationId: "",
      start_date: "",
      due_date: ""
    };
   
    this.renderTools = this.renderTools.bind(this);
    this.inputChar = this.inputChar.bind(this);
    this.stateBinder = this.stateBinder.bind(this);
    this.renderLists = this.renderLists.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.inputAdder = this.inputAdder.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  inputAdder(value) {
    this.setState({ input: this.state.input.concat(value) });
  }
  stateBinder(value) {
    this.setState(value)
  }

  tools() {
    return (
      <div className="flex-buttons">
        <button onClick={this.inputChar} value="~">
          <i className="fas fa-play" value="~" />
        </button>
        <button onClick={this.inputChar} value="^">
          <i className="fas fa-calendar icons" value="^" />
        </button>
        {/* duedate*/}
        <button onClick={this.inputChar} value="*">
          <i className="fas fa-list icons" value="*" />
        </button>
        {/* list */}
        <button onClick={this.inputChar} value="#">
          <i className="fas fa-tags icons" value="#" />
        </button>
        {/* tag */}
        <button onClick={this.inputChar} value="@">
          <i className="fas fa-map-marker-alt" value="@" />
        </button>
        {/* tag */}
      </div>
    );
  }

  renderTools() {
    return this.state.input.length > 0 ? this.tools() : <div />;
  }
  renderButton() {
    return this.state.input.length > 0 ? (
      <button className="create-task-button">Add Task</button>
    ) : (
      <div />
    );
  }
  renderLists() {
    const iArr = this.state.input.split("");
    const lastIndex = iArr.length - 1;
    const lastChar = iArr[lastIndex];

    switch (lastChar) {
      case "*":
        return (
          <ListOption
            inputAdder={this.inputAdder}
            stateBinder={this.stateBinder}
          />
        );
      case "#":
        return (
          <TagOption
            inputAdder={this.inputAdder}
            stateBinder={this.stateBinder}
          />
        );
      case "@":
        return (
          <LocationOption
            inputAdder={this.inputAdder}
            stateBinder={this.stateBinder}
          />
        );
      case "~":
        return (
          <DateOption
            type="start date"
            inputAdder={this.inputAdder}
            stateBinder={this.stateBinder}
          />
        );
      case "^":
        return (
          <DateOption
            type="due date"
            inputAdder={this.inputAdder}
            stateBinder={this.stateBinder}
          />
        );
      default:
        return <div />;
    }
  }

  inputChar(e) {
    e.preventDefault();
    this.setState({ input: this.state.input.concat(e.currentTarget.value) });
  }

  
  stringParser(string) {
    const filter = "~^*#@".split("")
    const firstKey = string.split("").find(ele => filter.includes(ele))
    const i = string.indexOf(firstKey)
    debugger 
    if (i === null) return string

    return string.slice(0, i).trim()
  }
    
  

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e, newTask) {
    e.preventDefaul()
    const name = this.stringParser(this.state.input)
    newTask({
      variables: {
        name: name,
        due_date: this.state.due_date,
        start_date: this.state.start_date,
        locationId: this.state.locationId,
        tagId: this.state.tagId,
        listId: this.state.listId,
        userId: localStorage.getItem("currentuserId")

      }
    })
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
