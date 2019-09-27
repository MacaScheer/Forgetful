import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import "../stylesheets/showpage_css.scss";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { FETCH_TASK, FETCH_USER } = Queries;
const { UPDATE_TASK_NAME } = Mutations;

class NameDetail extends React.Component {
  constructor(props) {
    super(props);
    const final_name = this.props.name;
    this.state = {
      editing: false,

      name: this.props.name || "",
      nameToBeChanged: this.props.name

    };

    this.handleEdit = this.handleEdit.bind(this);
    
    this.toggleOffEdit = this.toggleOffEdit.bind(this)

    // this.Ref = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.originalText = this.originalText.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.updateCache = this.updateCache.bind(this);

  }

  toggleOffEdit(e) {
    // debugger
    e.preventDefault();
    // debugger

    if (this.state.editing === true  && e.target.className !== "update-input") {

      // debugger
      this.setState({ editing: false, nameToBeChaged: this.props.name });
    } 
    // this.setState({editing: false, nameToBeChanged: this.props.name})
  }

  // componentWillMount() {
  //   window.addEventListener("click", this.toggleOffEdit)
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("click", this.toggleOffEdit);
  // }

  // handleClick = e => {
  //   if (this.Ref.current.contains(e.target)) {
  //     return;
  //   } else {
  //     this.setState({ editing: false });
  //   }
  // };


  handleEdit(e) {
    e.preventDefault();
    e.stopPropagation()
    this.setState({ editing: true });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  originalText(){
    debugger;
    this.state.editing = true;
    // this.state.name = this.state.nameToBeChanged;
  }


  
  handleSubmit (e, updateTask) {
    e.preventDefault();
    // debugger;
    updateTask({
      variables: {
        _id: this.props.id,
        name: this.state.nameToBeChanged
      }}
      ).then(() => this.setState({ editing: false , name: this.state.nameToBeChanged}));
  }


  

  render() {
    if (this.state.editing) {
      return (
        <Mutation 
        mutation={UPDATE_TASK_NAME}
          onError={err => this.setState({ message: err.message })}

        >
          {updateTask => (
            <div>
              <form

                // ref={this.Ref}
                onSubmit={e => this.handleSubmit(e, updateTask)}

              >
                  <input
                    type="text"
                    className="update-input"
                    // onfocusout={this.originalText()}
                    onBlur={this.toggleOffEdit}
                    value={this.state.nameToBeChanged}
                    onChange={this.fieldUpdate("nameToBeChanged")}
                  />
                  <button className="update-button"  >

                    Update Task

                  </button >
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (

        <div onClick={this.handleEdit} className="show-task-name">
          {/* ref={this.Ref} */}
          <p className="name-show">

            {this.state.name}
          </p>
        </div>
      );
    }
  }
}

export default NameDetail;
