import React from "react";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import TagOption from "./TagOptionDetail";
import "../stylesheets/showpage_css.scss";

const { UPDATE_TASK_TAG} = mutations;

class TagDetail extends React.Component {
    constructor(props) {
        super(props);
     
       
        this.state = {
            editing: false,
            changes: true,
            tagId: "",
            tagName: ""
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.inputAdder = this.inputAdder.bind(this);
        this.stateBinder = this.stateBinder.bind(this);
        this.toggleOffEditing = this.toggleOffEditing.bind(this);

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
        if (this.state.editing && !e.target.className.includes("task-tag")) {
            
            this.setState({ editing: false })
        }
    }

    fieldUpdate(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    inputAdder(value) {
        this.setState({ tagName: value });

    }
    stateBinder(value) {
        this.setState({ tagId: value });

    }

    componentDidUpdate(prevProps) {
        debugger
    }

    render() {
       
        if (this.state.editing) {
            return (
                <Mutation
                    mutation={UPDATE_TASK_TAG}
                    onError={err => this.setState({ message: err.message })}
                    onCompleted={(data) => {
                    
                        this.setState({ editing: false, changes: true })
                    }
                    }
                >
                    {updateTaskTag => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTaskTag({
                                        variables: { taskID: this.props.id, tagID: this.state.tagId.tagId }
                                    }).then(res => {
                                       
                                        this.setState({ editing: false, changes: true })}
                                    );
                                }}
                            >
                                <TagOption
                                    inputAdder={this.inputAdder}
                                    stateBinder={this.stateBinder}
                                />
                                <button className="update-button task-tag" type="submit">
                                    Update Tag{" "}
                                </button>
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        } else {
            

            return (
                <div>
                        <p className="tags-start-word">
                            Tags: 
                        </p>
                    <div className="Tagbox-tag" onClick={this.handleEdit}>
                        {this.props.tags.map((ele, i) => (
                            <div className="tags">
                                    <i class="fas fa-tags"></i> {ele.name}
                            </div>
                        ))}
                    </div>
                </div>

                    
                
            );
        }
    }
}

export default TagDetail;
