import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import merge from "lodash/merge";
const { CREATE_TAG, CREATE_LIST, CREATE_LOCATION } = Mutations;
const { FETCH_USER } = Queries;
export default class CreateModal extends Component {
  constructor(props) {
    super(props);

    const mutation = this.mutationPicker();
    this.state = {
      input: "",
      userId: localStorage.getItem("currentuserId"),
      message: "",
      mutation: mutation
    };

    this.mutationPicker = this.mutationPicker.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e, newObj) {
    e.preventDefault();
    e.stopPropagation();
    newObj({
      variables: {
        name: this.state.input,
        userid: this.state.userId
      }
    }).then(this.props.closer());
  }

  mutationPicker() {
    let mutation;
    switch (this.props.type) {
      case "list":
        return (mutation = CREATE_LIST);
      case "tag":
        return (mutation = CREATE_TAG);
      case "location":
        return (mutation = CREATE_LOCATION);
      default:
        return (mutation = "error");
    }
  }
  //
  updateCache(cache, { data }) {
    let user;
    try {
      const id = localStorage.getItem("currentuserId");

      user = cache.readQuery({ query: FETCH_USER, variables: { Id: id } });
    } catch (err) {
      return;
    }
    if (user) {
      const id = localStorage.getItem("currentuserId");
      let newObj;
      let cloned = merge({}, user);
      if (this.props.type === "list") {
        newObj = data.newList;
        newObj["tasks"] = [];
        cloned.user.lists.push(newObj);
        cache.writeQuery({
          query: FETCH_USER,
          variables: { Id: id },
          data: { user: cloned.user }
        });
      } else if (this.props.type === "tag") {
        newObj = data.newTag;
        newObj["tasks"] = [];

        cloned.user.tags.push(newObj);
        cache.writeQuery({
          query: FETCH_USER,
          variables: { Id: id },
          data: { user: cloned.user }
        });
      } else {
        newObj = data.newLocation;
        newObj["tasks"] = [];
        cloned.user.locations.push(newObj);
        cache.writeQuery({
          query: FETCH_USER,
          variables: { Id: id },
          data: { user: cloned.user }
        });
      }
    }
  }
  grabber(type) {
    let grabber;
    switch (this.props.type) {
      case "list":
        return (grabber = "list-grab");
      case "tag":
        return (grabber = "tag-grab");
      case "location":
        return (grabber = "location-grab");
      default:
        return (grabber = "error");
    }
  }

  render() {
    let grabber = this.grabber(this.props.type);
    return (
      <Mutation
        mutation={this.state.mutation}
        onError={err => this.setState({ message: err.message })}
        // onCompleted={data => {
        //   let newObj;
        //   if (this.state.type === "list") {
        //     newObj = data.newList;
        //   } else if (this.state.type === "tag") {
        //     newObj = data.newTag;
        //   } else {
        //     newObj = data.newLocation;
        //   }
        // }}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newObj, { data }) => (
          <div className="modal-container">
            <form
              className="modal-form"
              onSubmit={e => this.handleSubmit(e, newObj)}
            >
              <input
                className={`${grabber} modal-input`}
                onChange={this.update("input")}
                value={this.state.input}
              />
              <button
                className={`${grabber} add-list-button`}
              >{`create ${this.props.type}!`}</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
