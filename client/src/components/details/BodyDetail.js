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
    this.Ref = React.createRef();
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
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
                ref={this.Ref}
                onSubmit={e => {
                  e.preventDefault();
                  updateTask({
                    variables: { _id: this.props.id, body: this.state.body }
                  }).then(this.setState({ editing: false }));
                }}
              >
                <textarea onChange={this.fieldUpdate("body")}>
                  {this.state.body}
                  
                </textarea>
                <button className="update-button" type="submit">
                  Update Body{" "}
                </button>
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
          <p className="body-Tagbox" ref={this.Ref} onClick={this.handleEdit}>
            <p className="start-words"> Body:</p> &nbsp; {this.state.body}
          </p>
        </div>
      );
    }
  }
}

export default BodyDetail;
