import React from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
import TagOption from "./TagOptionDetail";
import "../stylesheets/showpage_css.scss";
const { FETCH_USER } = queries;

const { UPDATE_TASK_TAG } = mutations;

class TagDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      changes: true,
      tagId: ""
    };
    this.updateState = this.updateState.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    // this.stateBinder = this.stateBinder.bind(this);
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
      this.setState({ editing: false });
    }
  }

  //   fieldUpdate(field) {
  //     return e => this.setState({ [field]: e.target.value });
  //   }
  updateState(e) {
    // e.preventDefault();
    // debugger
    this.setState({ tagId: e.currentTarget.value });
  }

  //   stateBinder(value) {
  //     this.setState({ tagId: value });
  //   }
  updateCache(cache, data) {
    // debugger;
  }
  render() {
    if (this.state.editing) {
      return (
        <ApolloConsumer>
          {client => {
            const id = localStorage.getItem("currentuserId");

            const userData = client.readQuery({
              query: FETCH_USER,
              variables: { Id: id }
            });
            //   debugger
            return (
              <Mutation
                mutation={UPDATE_TASK_TAG}
                onError={err => this.setState({ message: err.message })}
                onCompleted={data => {
                  // debugger
                  this.setState({ editing: false, changes: true });
                }}
                update={(cache, data) => this.updateCache(cache, data)}
              >
                {updateTaskTag => (
                  <div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        debugger;
                        updateTaskTag({
                          variables: {
                            taskID: this.props.id,
                            tagID: this.state.tagId
                          }
                        }).then(res => {
                          this.setState({ editing: false, changes: true });
                        });
                      }}
                    >
                      <div>
                        <div className="task-list-container">
                          <div className="task-list task-list-filter">
                                            {userData.user.tags.map((tag, i) => (
                                                <button
                                                    className="task-tag task-list-items tag"
                                                    key={i}
                                                    value={tag._id}
                                                    name={tag.name}
                                                    //     onClick={e => {
                                                    //         e.preventDefault()
                                                    //         // debugger
                                                    //         this.setState({ tagId: e.currentTarget.value }, () => (
                                                    //             updateTaskTag({
                                                    //                 variables: {
                                                    //                     taskId: this.props.id,
                                                    //                     tagId: e.currentTarget.value
                                                    //                 }
                                                    //             })
                                                    //         ))

                                                    // }}
                                                    onClick={this.updateState}
                                                    // type="submit"
                                  
                              >
                                {tag.name}
                              </button>
                            ))}
                          </div>
                        </div>
                        {/* {this.renderModal()} */}
                      </div>
                      {/* <TagOption
                        updateTaskTag={updateTaskTag}
                        id={this.props.id}
                      /> */}
                      {/* <button className="update-button task-tag" type="submit">
                  Update Tag{" "}
                </button> */}
                    </form>
                  </div>
                )}
              </Mutation>
            );
          }}
        </ApolloConsumer>
      );
    } else {
      // debugger
      return (
        <div>
          <p className="tags-start-word">Tags:</p>
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
