import React from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import mutations from "../../graphql/mutations";

const {UPDATE_TASK_DUE_DATE} = mutations;

class DueDateDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            due_date: this.props.due_date || ""
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
                <Mutation mutation={UPDATE_TASK_DUE_DATE}>
                    {(updateTask) => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTask({
                                        variables: { _id: this.props.id, due_date: this.state.due_date }
                                    }).then(() => this.setState({ editing: false }));
                                }}
                            >
                                <input
                                    value={this.state.due_date}
                                    onChange={this.fieldUpdate("due_date")}
                                />
                                <button type="submit">Update Due_Date </button>
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        } 
        else {
            return (
                <div className="show-task-due-date">
                    {/* <div
                        onClick={this.handleEdit}
                        style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
                    >
                        <IconContext.Provider value={{ className: "custom-icon" }}>
                            <FaPencilAlt />
                        </IconContext.Provider>
                    </div> */}

                    {/* <h2>Due_date: {this.state.due_date}</h2> */}
                    <p onClick={this.handleEdit}>
                        Due_date: {this.state.due_date}
                    </p>
                </div>
            )
        }
    }
}

export default DueDateDetail;