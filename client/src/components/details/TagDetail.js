import React from "react";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import TagOption from "./TagOptionDetail";
import "../stylesheets/showpage_css.scss";

const { UPDATE_TASK_TAG} = mutations;

class TagDetail extends React.Component {
    constructor(props) {
        // debugger;
        super(props);
        let arr = [];
        // if (this.props.tags.length < 1){
        // this.props.tags.forEach(tag => {
        //     arr.push(tag.name);
        // })};
       
        this.state = {
            input: "",
            editing: false,
            changes: true,
            body: this.props.body || "",
            tags: this.props.tags || "",
            tagId: "",
            tags: this.props.tags,
            tagNames: arr
        };
        this.Ref = React.createRef();
        this.handleEdit = this.handleEdit.bind(this);
        // this.handleClick = this.handleClick.bind(this);
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
            // debugger
            
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

    render() {
        // debugger;
        
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
            
            this.state.tags.forEach(tag => {
                let temp = tag.name
                this.state.tagNames.push(temp)
            });
            this.state.tagNames.push(this.state.tagName);
            this.state.tagNames = [...new Set(this.state.tagNames)]
            // let length = this.state.tagNames.length - 1
            // if (this.state.tagNames[length] === this.state.tagNames[length - 1] && this.state.tagNames.length > 1) {
            //     this.state.tagNames.splice(-1, 1);
            // }
            return (
                <div className="show-task-body">
                    {/* <div
                        onClick={this.handleEdit}
                        style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
                    >
                        
                    </div> */}
                    {/* <h2>Body: </h2> */}
                    <p className="Tagbox" onClick={this.handleEdit}>
                        
                        
                        
                        <p className="start-words">Tags:</p> &nbsp; {this.state.tagNames}
                        
                    </p>
                    
                </div>
            );
        }
    }
}

export default TagDetail;
