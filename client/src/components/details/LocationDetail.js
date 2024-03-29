import React from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
import CreateModal from "../Modal/CreateModal";
import merge from "lodash/merge";
const { FETCH_USER, FETCH_TASK } = queries;

const { UPDATE_TASK_LOCATION } = mutations;

class LocationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      editing: false,
      changes: true,
      type: "location",
      body: this.props.body || "",
      location: this.props.location || "",
      locationId: "",
      render: false
    };
    this.renderEdit = this.renderEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleOffEditing = this.toggleOffEditing.bind(this);
    this.closer = this.closer.bind(this);
  }
  renderModal() {
    return this.state.render ? (
      <CreateModal closer={this.closer} type={this.state.type} />
    ) : (
      <div />
    );
  }
  closer() {
    this.setState({ render: false });
  }

  updateState(e) {
    this.setState({ locationId: e.currentTarget.value });
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
    if (this.state.editing && !e.target.className.includes("location-grab")) {
      this.setState({ editing: false });
    }
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  toggleModal(e) {
    e.preventDefault();
    this.setState({ render: true });
  }

  updateCache(cache, { data }) {
    let task;
    try {
      let id = this.props.id;
      task = cache.readQuery({ query: FETCH_TASK, variables: { Id: id } });
    } catch (err) {
      return;
    }
    if (task) {
      const cloned = merge({}, task.task.location);
      const newLocation = data.updateTaskLocation;
      cloned.task.location = newLocation;
      cache.writeQuery({
        query: FETCH_TASK,
        variables: { Id: this.props.id },
        data: { task: cloned.task }
      });
    }
  }
  renderEdit() {
    return this.state.editing ? (
      <ApolloConsumer>
        {client => {
          const id = localStorage.getItem("currentuserId");

          const userData = client.readQuery({
            query: FETCH_USER,
            variables: { Id: id }
          });
          return (
            <Mutation
              mutation={UPDATE_TASK_LOCATION}
              onError={err => this.setState({ message: err.message })}
              // update={(cache, data) => this.updateCache(cache, data)}
            >
              {updateTaskLocation => (
                <div>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      updateTaskLocation({
                        variables: {
                          taskID: this.props.id,
                          locationID: this.state.locationId
                        }
                      }).then(
                        this.setState({
                          editing: false,
                          changes: true,
                          locationNameToBe: this.state.locationName
                        })
                      );
                    }}
                  >
                    <div className="task-list-container">
                      <div className="location-grab task-location-filter">
                        {userData.user.locations.map((location, i) => (
                          <button
                            className="location-grab task-list-items tag"
                            key={i}
                            value={location._id}
                            name={location.name}
                            onClick={this.updateState}
                          >
                            {location.name}
                          </button>
                        ))}
                      </div>
                      <div>
                        <button
                          className="location-grab add-list-button"
                          onClick={this.toggleModal}
                        >
                          Create New Location
                        </button>
                      </div>
                    </div>
                    {this.renderModal()}
                  </form>
                </div>
              )}
            </Mutation>
          );
        }}
      </ApolloConsumer>
    ) : (
      <div />
    );
  }
  render() {
    return (
      <div className="show-task-body">
        <div className="Tagbox" onClick={this.handleEdit}>
          <p className="start-words">Location:</p> &nbsp;{" "}
          <div className="location">
            <i className="fas fa-map-marker-alt"></i>
            {this.props.location ? this.props.location.name : <div />}
          </div>
        </div>
        {this.renderEdit()}
      </div>
    );
  }
}

export default LocationDetail;
