import React from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import mutations from "../../graphql/mutations";
import CreateModal from "../Modal/CreateModal";
import queries from "../../graphql/queries";
import merge from "lodash/merge";
const { FETCH_USER, FETCH_TASK } = queries;
const { UPDATE_TASK_LIST } = mutations;

class ListDetail extends React.Component {
  constructor(props) {
    super(props);
    let temp = "";
    if (this.props.list !== null) {
      temp = this.props.list.name;
    }
    this.state = {
      input: "",
      type: "list",
      editing: false,
      changes: true,
      list: this.props.list || "",
      listId: "",
      render: false
    };
    this.renderEdit = this.renderEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.stateBinder = this.stateBinder.bind(this);
    this.updateState = this.updateState.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleOffEditing = this.toggleOffEditing.bind(this);
    this.closer = this.closer.bind(this)

  }
  closer() {
    this.setState({ render: false });
  }
  renderModal() {
    return this.state.render ? (
      <CreateModal closer={this.closer} type={this.state.type} />
    ) : (
      <div />
    );
  }
  toggleModal(e) {
    e.preventDefault();
    this.setState({ render: true });
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
    if (this.state.editing && !e.target.className.includes("task-grab")) {
      let temp = "";
      if (this.props.list !== null) {
        temp = this.props.list.name;
      }
      this.setState({ editing: false, listName: temp });
    }
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  inputAdder(value) {
    this.setState({ listName: value });
  }
  stateBinder(value) {
    this.setState({ listId: value });
  }

  updateState(e) {
    this.setState({ listId: e.currentTarget.value });
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
      const newList = data.updateTaskList;
      cloned.task.list = newList.list;
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
              mutation={UPDATE_TASK_LIST}
              onError={err => this.setState({ message: err.message })}
              update={(cache, data) => this.updateCache(cache, data)}
            >
              {updateTaskList => (
                <div>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      updateTaskList({
                        variables: {
                          taskID: this.props.id,
                          listID: this.state.listId
                        }
                      }).then(this.setState({ editing: false, changes: true }));
                    }}
                  >
                    <div>
                      <div className=" task-list-container">
                        <div className=" task-list task-list-filter">
                          {userData.user.lists.map((list, i) => (
                            <button
                              className="task-grab task-tag task-list-items tag"
                              key={i}
                              value={list._id}
                              name={list.name}
                              onClick={this.updateState}
                            >
                              {list.name}
                            </button>
                          ))}
                        </div>
                        <div>
                        <button
                          className="task-grab add-list-button"
                          onClick={this.toggleModal}
                        >
                          Create New List
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
      <div className="show-task-body">
        <p className="Tagbox" onClick={this.handleEdit}>
          <p className="start-words">List: </p> &nbsp;{" "}
          {this.props.list ? this.props.list.name : <div />}
        </p>
        {this.renderEdit()}
      </div>
    );
  }
}

export default ListDetail;
