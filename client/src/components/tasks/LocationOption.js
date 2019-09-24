import React, { Component } from "react";
import CreateModal from "../Modal/CreateModal";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "../stylesheets/tag_and_list_option.scss";
const { FETCH_USER } = Queries;

export default class LocationOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationId: "",
      name: "",
      render: false,
      type: "location"
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.updateState = this.updateState.bind(this);
    this.closer = this.closer.bind(this);
    this.binder = this.binder.bind(this);
  }

  closer() {
    this.setState({ render: false });
  }
  toggleModal(e) {
    e.preventDefault();
    this.setState({ render: !this.state.render });
  }

  renderModal() {
    return this.state.render ? (
      <CreateModal closer={this.closer} type={this.state.type} />
    ) : (
      <div />
    );
  }

  updateState(e) {
    e.preventDefault();
    this.setState(
      {
        name: e.target.name,
        locationId: e.target.value
      },
      () => { this.binder() }
    );
  }

  binder() {
    this.props.inputAdder(this.state.name);
    this.props.stateBinder({ locationId: this.state.locationId });
  }

  render() {
    const cid = localStorage.getItem("currentuserId");
    return (
      <Query query={FETCH_USER} variables={{ Id: cid }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user.locations) {
            return (
              <div>
                <div className="task-list-container">
                  <div className="task-list task-list-filter">
                    {data.user.locations.map((location, i) => (
                      <button
                        className="task-list-items"
                        key={i}
                        value={location._id}
                        name={location.name}
                        onClick={this.updateState}
                      >
                        {location.name}
                      </button>
                    ))}
                  </div>
                  <button onClick={this.toggleModal}>Add Location</button>
                </div>
                {this.renderModal()}
              </div>
            );
          } else {
            return null;
          }
        }}
      </Query>
    );
  }
}
