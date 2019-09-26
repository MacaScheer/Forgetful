import React from "react";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import TagOption from "./TagOptionDetail";
import "../stylesheets/showpage_css.scss";

const { UPDATE_TASK_TAG} = mutations;

class LocationDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            editing: false,
            changes: true,
            body: this.props.body || "",
            tags: this.props.tags || "",
            tagId: "",
            tags: this.props.tags
        };
        this.Ref = React.createRef();
        this.handleEdit = this.handleEdit.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        this.inputAdder = this.inputAdder.bind(this);
        this.stateBinder = this.stateBinder.bind(this);

    }

    handleEdit(e) {
        e.preventDefault();
        this.setState({ editing: true, changes: false });
    }

    componentWillMount() {
        document.addEventListener("mousedown", this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClick, false);
    }

    // handleClick = e => {
    //     if (this.Ref.current.contains(e.target)) {
    //         return;
    //     } else {
    //         this.setState({ editing: false });
    //     }
    // };

    fieldUpdate(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    inputAdder(value) {
        this.setState({ tagName: value });

    }
    stateBinder(value) {
        this.setState({ tagId: value });

    }

    render() {
        // debugger;
        if (this.state.editing) {
            return (
                <Mutation
                    mutation={UPDATE_TASK_TAG}
                    onError={err => this.setState({ message: err.message })}
                >
                    {updateTaskLocation => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTaskLocation({
                                        variables: { taskID: this.props.id, tagID: this.state.tagId.tagId }
                                    }).then(this.setState({ editing: false, changes: true }));
                                }}
                            >
                                <TagOption
                                    inputAdder={this.inputAdder}
                                    stateBinder={this.stateBinder}
                                />
                                <button className="update-button" type="submit">
                                    Update Tag{" "}
                                </button>
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        } else {
            // debugger;
            return (
                <div className="show-task-body">
                    {/* <div
                        onClick={this.handleEdit}
                        style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
                    >
                        
                    </div> */}
                    {/* <h2>Body: </h2> */}
                    <p className="Tagbox" onClick={this.handleEdit}>
                        Tags:
                        <div>
                            {this.props.tags.map((tag, i) => (
                                <div key={`tag-${i}`}>
                                    {tag.name}
                                </div>

                            ))}
                        </div>
                        <div>
                            {this.state.tagName}
                        </div>
                    </p>
                    
                </div>
            );
        }
    }
}

export default LocationDetail;
