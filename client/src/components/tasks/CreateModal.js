import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { CREATE_TAG, CREATE_LIST, CREATE_LOCATION } = Mutations;

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
              <button className="modal-button">{`create ${this.props.type}!`}</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
