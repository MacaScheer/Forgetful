import React from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import mutations from "../../graphql/mutations";

const { UPDATE_TASK_BODY } = mutations;

class BodyDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      body: this.props.body || ""
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

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
        <Mutation mutation={UPDATE_TASK_BODY}>
          {updateTask => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateTask({
                    variables: { _id: this.props.id, body: this.state.body }
                  }).then(this.setState({ editing: false }));
                }}
              >
                <input
                  value={this.state.body}
                  onChange={this.fieldUpdate("body")}
                />
                <button type="submit">Update Body </button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div className="show-task-body">
          {/* <div
                        onClick={this.handleEdit}
                        style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
                    >
                        <IconContext.Provider value={{ className: "custom-icon" }}>
                            <FaPencilAlt />
                        </IconContext.Provider>
                    </div> */}
          {/* <h2>Body: </h2> */}
          <p onClick={this.handleEdit}>Body: {this.state.body}</p>
        </div>
      );
    }
  }
}

export default BodyDetail;
