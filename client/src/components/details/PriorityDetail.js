import React from "react";
import { Mutation } from "react-apollo";
import "../stylesheets/showpage_css.scss";
import mutations from "../../graphql/mutations";

const { UPDATE_TASK_PRIORITY } = mutations;
// import UPDATE_TASK_NAME from "../../graphql/mutations";


class PriorityDetail extends React.Component {
    constructor(props) {
        super(props);
        // debugger;
        this.state = {
            editing: false,
            name: this.props.name || ""
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
        // debugger;
        if (this.state.editing) {
            return (
                <Mutation mutation={UPDATE_TASK_PRIORITY}>
                    {(updateTask) => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTask({
                                        variables: { _id: this.props.id, name: this.state.name }
                                    }).then(this.setState({ editing: false }));
                                }}
                            >
                                <input
                                    value={this.state.name}
                                    onChange={this.fieldUpdate("name")}
                                />
                                <button type="submit">Update Name </button>
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        }
        else {
            return (
                <div className="show-task-name">
                    
                    <p onClick={this.handleEdit}>
                        {this.state.name}
                    </p>
                    {/* <h2>Name: {this.state.name}</h2> */}
                </div>
            )
        }
    }
}

export default PriorityDetail;