import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";
import "../stylesheets/dropdown.scss";

const { FETCH_USER } = Queries;
export default class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInbox: true,
      showLists: false,
      showTags: true,
      showLocations: true
    };
    this.toggleInbox = this.toggleInbox.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleTags = this.toggleTags.bind(this);
    this.toggleLocations = this.toggleLocations.bind(this);
  }

  // componentDidMount() {
  //   debugger
  //   this.dropdown.classList.add("slide");
  // }

  toggleInbox(e) {
    e.preventDefault();
    this.setState({ showInbox: !this.state.showInbox });
  }

  toggleList(e) {
    e.preventDefault();
    this.setState({ showList: !this.state.showList });
  }

  toggleTags(e) {
    e.preventDefault();
    this.setState({ showTags: !this.state.showTags });
  }

  toggleLocations(e) {
    e.preventDefault();
    this.setState({ showLocations: !this.state.showLocations });
  }
  renderInboxCat() {
    if (this.state.showInbox) {
      return (
        <div className="inbox-subcat">
          <Link to="/all">Inbox</Link>
          <Link to="/today">Today </Link>
          <Link to="/tomorrow">Tomorrow </Link>
          <Link to="/thisweek">This Week</Link>
          <Link to="/trash">Trash</Link>
        </div>
      );
    }
  }

  render() {
    const cid = localStorage.getItem("currentuserId");
    const { showLists, showTags } = this.state;
    return (
      <Query query={FETCH_USER} variables={{ Id: cid }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user) {
            return (
              <div
                className="left-nav-container st-effect-13 slide"
                id="st-container"
              >
                <div className="left-nav-inbox-container">
                  <h2 className="title">Forgetful</h2>

                  <div className="flex-buttons">
                    <i
                      onClick={this.toggleInbox}
                      className="fas fa-sort-down icons"
                    ></i>
                    {this.state.toggleInbox ? (
                      <Link to="/lists/inbox">Inbox</Link>
                    ) : (
                      <Link to="/all">All Tasks</Link>
                    )}
                  </div>
                  {this.renderInboxCat()}
                </div>
                <div
                  className="left-nav-lists-container"
                  id="st-container"
                >
                  <div onClick={this.toggleList}>
                    <i className="fas fa-sort-down icons"></i>
                    Lists
                    <div className="lists-subcat">
                      {showLists ? (
                        data.user.lists.map(list => (
                          <Link to={`lists/${list.name}`}>{list.name}</Link>
                        ))
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </div>
                <div className="left-nav-tags-container"
                  id="st-container">
                  <div onClick={this.toggleTags}>
                    <i className="fas fa-sort-down icons"></i>
                    Tags
                    <div className="tags-subcat">
                      {showTags ? (
                        data.user.tags.length !== 0 ? (
                          data.user.tags.map(tag => (
                            <Link to={`tags/${tag.name}`}>{tag.name}</Link>
                          ))
                        ) : (
                          <div />
                        )
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </div>
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
