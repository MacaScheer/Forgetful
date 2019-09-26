import React from "react";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import ListOption from "./ListDetailListOptions"

const { UPDATE_TASK_LIST } = mutations;

class ListDetail extends React.Component {
    constructor(props) {
        super(props);
        let temp = "";
        if (this.props.list !== null) {
            temp = this.props.list.name
        }
        this.state = {
            input: "",
            editing: false,
            changes: true,
            body: this.props.body || "",
            list: this.props.list || "",
            listId: "",
            listName: temp
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.inputAdder = this.inputAdder.bind(this);
        this.stateBinder = this.stateBinder.bind(this);
        this.toggleOffEditing = this.toggleOffEditing.bind(this)
       
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
        if (this.state.editing && !e.target.className.includes("task-grab")) {
            // debugger
          let temp = "";
          if (this.props.location !== null) {
            temp = this.props.list.name
          }
            this.setState({ editing: false, listName: temp })
        }
    }
  
    fieldUpdate(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    inputAdder(value) {
        this.setState({ listName: value });
        
    }
    stateBinder(value) {
        this.setState({listId: value});
        
    }

    render() {
        
        if (this.state.editing) {
            return (
              <Mutation
                mutation={UPDATE_TASK_LIST}
                onError={err => this.setState({ message: err.message })}
              >
                {updateTaskList => (
                  <div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        updateTaskList({
                          variables: {
                            taskID: this.props.id,
                            listID: this.state.listId.listId
                          }
                        }).then(
                          this.setState({ editing: false, changes: true })
                        );
                      }}
                    >
                      <ListOption
                        inputAdder={this.inputAdder}
                        stateBinder={this.stateBinder}
                      />
                      <button className="task-grab update-button" type="submit">
                        Update List{" "}
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
                    <p onClick={this.handleEdit}>
                        List: {this.state.listName}
                    </p>
                </div>
            );
        }
    }
}

export default ListDetail;