import React from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
import CreateModal from "../Modal/CreateModal";
import "../stylesheets/showpage_css.scss";
import merge from "lodash/merge";
const { FETCH_USER, FETCH_TASK } = queries;

const { UPDATE_TASK_TAG } = mutations;

class TagDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      changes: true,
      tagId: "",
      type: "tag"
    };
    this.updateState = this.updateState.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleOffEditing = this.toggleOffEditing.bind(this);
  }
    componentDidUpdate(prevprops) {
        // debugger
    }
  renderModal() {
    return this.state.render ? (
      <CreateModal closer={this.closer} type={this.state.type} />
    ) : (
      <div />
    );
  }
  closer() {
    this.setState({ render: false });
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
  toggleModal(e) {
    e.preventDefault();
    this.setState({ render: true });
  }

  updateState(e) {
    this.setState({ tagId: e.currentTarget.value });
  }

  updateCache(cache, { data }) {
    // debugger
    let task;
    try {
      let id = this.props.id;
      task = cache.readQuery({ query: FETCH_TASK, variables: { Id: id } });
    } catch (err) {
      // debugger
      return;
    }
      if (task) {
          // debugger
          const cloned = merge([], task.task.tags);
          // if (!cloned[0]) cloned[0] = this.state.tagId
          const newTag = data.updateTaskTag;
          cloned.push(newTag);
          // debugger
          cache.writeQuery({
              query: FETCH_TASK,
              variables: { Id: this.props.id },
              data: { task: {[this.props.id]: { tags: cloned }} }
      });
    }
  }
  render() {
    //   debugger
    if (this.state.editing) {
      return (
        <ApolloConsumer>
          {client => {
            const id = localStorage.getItem("currentuserId");

            const userData = client.readQuery({
              query: FETCH_USER,
              variables: { Id: id }
            });
            return (
              <Mutation
                mutation={UPDATE_TASK_TAG}
                onError={err => this.setState({ message: err.message })}
                onCompleted={data => {
                  this.setState({ editing: false, changes: true });
                }}
                update={(cache, data) => this.updateCache(cache, data)}
              >
                {updateTaskTag => (
                  <div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
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
                                onClick={this.updateState}
                              >
                                {tag.name}
                              </button>
                            ))}
                          </div>
                          <button
                            className="add-list-button"
                            onClick={this.toggleModal}
                          >
                            Create New Tag
                          </button>
                        </div>
                        {this.renderModal()}
                      </div>
                    </form>
                  </div>
                )}
              </Mutation>
            );
          }}
        </ApolloConsumer>
      );
    } else {
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
