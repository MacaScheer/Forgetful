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
    this.renderEdit = this.renderEdit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleOffEditing = this.toggleOffEditing.bind(this);
    this.closer = this.closer.bind(this);
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
    if (this.state.editing && !e.target.className.includes("tag-grab")) {
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
    let task;
    try {
      let id = this.props.id;
      task = cache.readQuery({ query: FETCH_TASK, variables: { Id: id } });
    } catch (err) {
      return;
    }
    if (task) {
      const cloned = merge({}, task);
      const newTag = data.updateTaskTag;
      cloned.task.tags.push(newTag);
      cache.writeQuery({
        query: FETCH_TASK,
        variables: { Id: this.props.id },
        data: { task: cloned.task }
      });
    }
  }
  renderEdit() {
    return this.state.editing ? (
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
                              className="tag-grab task-list-items tag"
                              key={i}
                              value={tag._id}
                              name={tag.name}
                              onClick={this.updateState}
                            >
                              {tag.name}
                            </button>
                          ))}
                          <button
                            className="tag-grab add-list-button"
                            onClick={this.toggleModal}
                          >
                            Create New Tag
                          </button>
                        </div>
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
    ) : (
      <div />
    );
  }
  render() {
 
    return (
      <div className="outer-tag">
        <p className="tags-start-word">Tags: </p>
        <div className="Tagbox-tag" onClick={this.handleEdit}>
          {this.props.tags.length > 0 ? (
            this.props.tags.map((ele, i) => (
              <div className="tags">
                <i className="fas fa-tags"></i> {ele.name}
              </div>
            ))
          ) : (
            <div className="tags">
              <i class="fas fa-tags" onClick={this.handleEdit}></i>
            </div>
          )}
        </div>
        {this.renderEdit()}
      </div>
    );
  }
}

export default TagDetail;
