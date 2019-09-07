import React, { Component } from "react";
import CreateModal from "./CreateModal";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "../stylesheets/tag_and_list_option.scss";
const { FETCH_USER } = Queries;

export default class ListOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: "",
      name: "",
      render: false,
      type: "list"
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
        listId: e.target.value
      },
      this.binder()
    );
  }
  binder() {
    this.props.inputAdder(this.state.name);
    this.props.stateBinder({ listId: this.state.listId });
  }

  render() {
    const cid = localStorage.getItem("currentuserId");
    return (
      <Query query={FETCH_USER} variables={{ Id: cid }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user.lists) {
            return (
              <div>
                <div className="task-list-container ">
                  <div className="task-list task-list-filter">
                    {data.user.lists.map((list, i) => (
                      <button
                        className="task-list-item"
                        key={i}
                        value={list._id}
                        name={list.name}
                        onClick={this.updateState}
                      >
                        {list.name}
                      </button>
                    ))}
                  </div>
                  <button
                    className="add-list-button"
                    onClick={this.toggleModal}
                  >
                    Add List
                  </button>
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
