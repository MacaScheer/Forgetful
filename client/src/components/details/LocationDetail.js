import React from "react";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import LocationOption from "./LocationOptionDetail"

const { UPDATE_TASK_LOCATION } = mutations;

class LocationDetail extends React.Component {
  constructor(props) {
    super(props);
    let temp = "";
    if (this.props.location !== null){
      temp = this.props.location.name
    }
    // debugger;
    this.state = {
      input: "",
      editing: false,
      changes: true,
      body: this.props.body || "",
      location: this.props.location || "",
      locationId: "" ,
      locationName: temp
    };
    this.Ref = React.createRef();
    this.handleEdit = this.handleEdit.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.inputAdder = this.inputAdder.bind(this);
    this.stateBinder = this.stateBinder.bind(this);
    this.toggleOffEditing = this.toggleOffEditing.bind(this);

  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true, changes: false });
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.toggleOffEditing);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.toggleOffEditing);
  }
  toggleOffEditing(e) {
    if (this.state.editing && !e.target.className.includes("location-list")) {
      debugger

      let temp = "";
      if (this.props.location !== null) {
        temp = this.props.location.name
      }
      this.setState({ editing: false, locationName: temp })
    }
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  inputAdder(value) {
    this.setState({ locationName: value });

  }
  stateBinder(value) {
    this.setState({ locationId: value });

  }

  render() {
    if (this.state.editing) {
      return (
        <Mutation
          mutation={UPDATE_TASK_LOCATION}
          onError={err => this.setState({ message: err.message })}
        >
          {updateTaskLocation => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateTaskLocation({
                    variables: { taskID: this.props.id, locationID: this.state.locationId.locationId }
                  }).then(this.setState({ editing: false, changes: true, locationNameToBe: this.state.locationName }));
                }}
              >
                <LocationOption
                  inputAdder={this.inputAdder}
                  stateBinder={this.stateBinder}
                />
                <button className="update-button location-list" type="submit">
                  Update Location{" "}
                </button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div className="show-task-body">
          <div className="Tagbox" onClick={this.handleEdit}>

            <p className="start-words">Location:</p>  &nbsp; {this.state.locationName}
          </div>
        </div>
      );
    }
  }
}

export default LocationDetail;
