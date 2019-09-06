import React from "react";
import { Mutation } from "react-apollo";
import "../stylesheets/showpage_css.scss";
import mutations from "../../graphql/mutations";

const { UPDATE_TASK_PRIORITY } = mutations;


class PriorityDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            priority: this.props.priority || ""
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
                <Mutation mutation={UPDATE_TASK_PRIORITY}>
                    {(updateTask) => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTask({
                                        variables: { _id: this.props.id, priority: this.state.priority }
                                    }).then(() => this.setState({ editing: false }));
                                }}
                            >
                                <input
                                    value={this.state.priority}
                                    onChange={this.fieldUpdate("priority")}
                                />
                                <button type="submit">Update Priority </button>
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        }
        else {
            return (
                <div className="show-task-priority">
                    
                    <p onClick={this.handleEdit}>
                        Priority: {this.state.priority}
                    </p>
                    {/* <h2>Name: {this.state.name}</h2> */}
                </div>
            )
        }
    }
}

export default PriorityDetail;