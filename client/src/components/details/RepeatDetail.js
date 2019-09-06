import React from "react";
import { Mutation } from "react-apollo";
import "../stylesheets/showpage_css.scss";
import mutations from "../../graphql/mutations";

const { UPDATE_TASK_REPEAT } = mutations;


class RepeatDetail extends React.Component {
    constructor(props) {
        super(props);
        // debugger;
        this.state = {
            editing: false,
            repeat: this.props.repeat || ""
        };

        this.Ref = React.createRef();
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        if (this.Ref.current.contains(e.target)) {
            return;
        } else {
            this.setState({ editing: false });
        }


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
                <Mutation mutation={UPDATE_TASK_REPEAT}>
                    {(updateTask) => (
                        <div>
                            <form
                                ref={this.Ref}
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTask({
                                        variables: { _id: this.props.id, repeat: this.state.repeat }
                                    }).then(() => this.setState({ editing: false }));
                                }}
                            >
                                <input
                                    
                                    value={this.state.priority}
                                    onChange={this.fieldUpdate("repeat")}
                                />
                                <button type="submit">Update Repeat </button>
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        }
        else {
            return (
                <div className="show-task-priority">

                    <p 
                        ref={this.Ref}
                    onClick={this.handleEdit}>
                        Repeat: {this.state.repeat}
                    </p>
                    {/* <h2>Name: {this.state.name}</h2> */}
                </div>
            )
        }
    }
}

export default RepeatDetail;