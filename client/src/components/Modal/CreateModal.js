import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
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
      let newObj = data.Obj;

      if (this.props.type === "list") {
        user.user.lists.push(newObj);
        cache.writeQuery({
          query: FETCH_USER,
          variables: { Id: id },
          data: { user: user.user }
        });
      } else if (this.props.type === "tag") {
        user.user.tags.push(newObj);
        cache.writeQuery({
          query: FETCH_USER,
          variables: { Id: id },
          data: { user: user.user }
        });
      } else {
        user.user.locations.push(newObj);
        cache.writeQuery({
          query: FETCH_USER,
          variables: { Id: id },
          data: { user: user.user }
        });
      }
    }
  }

  render() {
    let mutation;
    return (
      <Mutation
        mutation={this.state.mutation}
        onError={err => this.setState({ message: err.message })}
        onCompleted={data => {
          let newObj;
          this.state.type === "list"
            ? (newObj = data.newList)
            : (newObj = data.newTag);
          const { name } = newObj;
          console.log(`${name} created succesfully`);
        }}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newObj, { data }) => (
          <div className="modal-container">
            <form
              className="modal-form"
              onSubmit={e => this.handleSubmit(e, newObj)}
            >
              <input
                className="modal-input"
                onChange={this.update("input")}
                value={this.state.input}
              />
              <button className="add-list-button">{`create ${this.props.type}!`}</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
