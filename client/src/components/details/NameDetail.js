import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import "../stylesheets/showpage_css.scss";
import Mutations from "../../graphql/mutations";

const { UPDATE_TASK_NAME } = Mutations;

class NameDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.name || ""
    };

    this.handleEdit = this.handleEdit.bind(this);

    this.Ref = React.createRef();
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (this.Ref.current.contains(e.target)) {
      return;
    } else {
      this.setState({ editing: false });
    }
  };
  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    if (this.state.editing) {
      return (
        <Mutation mutation={UPDATE_TASK_NAME}>
          {updateTask => (
            <div>
              <form
                ref={this.Ref}
                onSubmit={e => {
                  e.preventDefault();
                  updateTask({
                    variables: { _id: this.props.id, name: this.state.name }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <input
                  className="update-input"
                  value={this.state.name}
                  onChange={this.fieldUpdate("name")}
                />
                <button className="update-button" type="submit">
                  Update Task{" "}
                </button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div className="show-task-name">
          <p ref={this.Ref} onClick={this.handleEdit}>
            {this.state.name}
          </p>
        </div>
      );
    }
  }
}

export default NameDetail;
