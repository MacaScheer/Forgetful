import React, { Component } from "react";
import CreateModal from './CreateModal'
import { Query } from 'react-apollo'
import Queries from '../../graphql/queries'
import '../stylesheets/tag_and_list_option.scss'
const { FETCH_USER } = Queries 

export default class ListOption extends Component {
  constructor(props){
    super(props)
    this.state = {
      listId: "",
      name: "",
      render: false,
      type: "list"
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  toggleModal(e) {
    e.preventDefault();
    this.setState({ render: !this.state.render });
  }

  renderModal() {
    return this.state.render ? <CreateModal type={this.state.type} /> : <div />
  }
  
  updateState(e) {
    debugger
    e.preventDefault();
    this.setState({ name: e.target.name, listId: e.target.value });
  }

  render() {
    const cid = localStorage.getItem("currentuserId");
    debugger
    return (
      <Query query={FETCH_USER} variables={{ Id: cid }}>
        {({ loading, error, data }) => {
          debugger
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user.lists) {
            return (
              <div>
                <div className="task-list-container">
                  <div className="task-list">
                    {data.user.lists.map((list, i) => (
                      <button
                        className="task-list-item"
                        key={i}
                        value={list._id}
                        name={list.name}
                        onClick={this.updateState}
                      >
                        {list.name}
                      </button>
                    ))}
                  </div>
                  <button onClick={this.toggleModal}>Add List</button>
                </div>
                {this.renderModal()}
              </div>
            );
          } else {
            return null;
          }
        }}
      </Query>
    );
  }
}
