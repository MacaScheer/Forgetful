import React from "react";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import DueDateOption from "./DueDateOption";
import "../stylesheets/showpage_css.scss";

const { UPDATE_TASK_DUE_DATE } = mutations;

class DueDateDetail extends React.Component {
  constructor(props) {
    super(props);
    // debugger
    this.state = {
      input: "",
      editing: false,
      picking_date: false,
      datePicked: false,
      due_date: this.props.due_date,
      due_dateId: "" 
    };
    this.handleEdit = this.handleEdit.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.inputAdder = this.inputAdder.bind(this);
    this.stateBinder = this.stateBinder.bind(this);
    this.toggleOffEditing = this.toggleOffEditing.bind(this);

  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true, pickingDate: true });
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.toggleOffEditing);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.toggleOffEditing);
  }

  toggleOffEditing(e) {
    // debugger;
    if (this.state.editing && !e.target.className.includes("task-due-date")) {
      // debugger

      this.setState({ editing: false })
    }
  }

  // handleClick = e => {
  //     if (this.Ref.current.contains(e.target)) {
  //         return;
  //     } else {
  //         this.setState({ editing: false });
  //     }
  // };

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  inputAdder(value) {
    this.setState({ due_date: value });

  }
  stateBinder(value) {
    this.setState({ due_dateId: value });
    this.setState({ datePicked: true });
    this.setState({ pickingDate: false})
  }

  render() {
    // debugger;
    if (this.state.editing) {
      const {datePicked, pickingDate, due_date} = this.state
      return (
        <Mutation
          mutation={UPDATE_TASK_DUE_DATE}
          onError={err => this.setState({ message: err.message })}
        >
          {updateTaskDue_date => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateTaskDue_date({
                    variables: { _id: this.props.id, due_date: this.state.due_dateId.due_date}
                  }).then(this.setState({ editing: false, changes: true, datePicked: false }));
                }}
              > 
              CurrentDate:{due_date}
                {pickingDate ? <DueDateOption
                  stateBinder={this.stateBinder}
                  inputAdder={this.inputAdder}
                  type={"due_date"}
                /> : <div />}
                {datePicked ? <button className="task-due-date update-button" type="submit">
                  Update Due_Date
                </button> : <div/> }
                
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      // debugger;
      return (
        <div className="show-task-body">
          {/* <div
                        onClick={this.handleEdit}
                        style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
                    >
                        
                    </div> */}
          {/* <h2>Body: </h2> */}
          <p className="Tagbox" onClick={this.handleEdit}>
           
              Due_Date: {this.props.due_date}
          </p>

        </div>
      );
    }
  }
}

export default DueDateDetail;
