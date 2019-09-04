import React, { Component } from "react";
import CreateModal from './CreateModal'
import {Query} from 'react-apollo'
import Queries from '../../graphql/queries'
import '../stylesheets/tag_and_list_option.scss'

const { FETCH_USER} = Queries 
export default class TagOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      objectId: "",
      name: "",
      type: "tag"
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(e) {
    e.preventDefault();
    this.setState({ render: !this.state.render });
  }

  renderModal() {
    return this.state.render ? <CreateModal type={this.state.type} /> :
      <div/>
  }

  render() {
    const cid = localStorage.getItem("currentuserId");
    return (
      <Query query={FETCH_USER} variables={{ Id: cid }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user.tags) {
            return (
              <div>
                <div className="task-list-container">
                  <div className="task-list">
                    {data.user.tags.map((tag, i) => (
                      <div className="task-list-item" key={i}>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                  <button className="task-list-button" onClick={this.toggleModal}>Add Tag</button>
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
