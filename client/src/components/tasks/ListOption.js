import React, { Component } from "react";
import CreateModal from './CreateModal'
import { Query } from 'react-apollo'
import Queries from '../../graphql/queries'
import '../stylesheets/tag_option.scss'
const { FETCH_USER } = Queries 

export default class ListOption extends Component {
  constructor(props){
    super(props)
    this.state = {
      objectId: "",
      name: "",
      render: false,
      type: "list"
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e) {
    e.preventDefault();
    this.setState({ render: !this.state.render });
  }

  renderModal() {
    return this.state.render ? <CreateModal type={this.state.type} /> : <div />
  }

  render() {
    const cid = localStorage.getItem("currentuserId");
    return (
      <Query query={FETCH_USER} variables={{ Id: cid }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user.lists) {
            return (
              <div>
                <div className="task-list-container">
                  <div className="task-list">
                    {data.user.lists.map((list, i) => (
                      <div className="task-list-item" key={i}>
                        {list.name}
                      </div>
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
