import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";

const { FETCH_USER } = Queries 
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

  toggleInbox(e) {
    e.preventDefault();
    return e => this.setState({ showInbox: !this.state.showInbox });
  }

  toggleList(e) {
    e.preventDefault();
    return e => this.setState({ showList: !this.state.showList });
  }

  toggleTags(e) {
    e.preventDefault();
    return e => this.setState({ showTags: !this.state.showTags });
  }

  toggleLocations(e) {
    e.preventDefault();
    return e => this.setState({ showLocations: !this.state.showLocations });
  }
  renderInboxCat() {
    if (this.state.showInbox) {
      return (
        <div className="inbox-subcat">
          <Link to="/all">All Tasks</Link>
          <Link to="/today">Today </Link>
          <Link to="/tomorrow">Tomorrow </Link>
          <Link to="/thisweek">This Week</Link>
          <Link to="/trash">Trash</Link>
        </div>
      );
    }
  }

  renderInbox() {
    const cid = localStorage.getItem("currentuserId");
    const { showLists, showTags, showLocations } = this.state;
    return (
      <Query query={FETCH_USER} variables={{ Id: cid }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user) {
            return (
              <div className="left-nav-container">
                <div className="left-nav-inbox-container">
                  <div>
                    <i
                      onClick={this.toggleInbox}
                      className="fas fa-sort-down"
                    ></i>
                    {this.state.toggleInbox ? (
                      <Link to="/list/inbox">Inbox</Link>
                    ) : (
                      <Link to="/all">All Tasks</Link>
                    )}
                  </div>
                  {this.renderInboxCat()}
                </div>
                <div className="left-nav-lists-container">
                  <div onClick={this.toggleList}>
                    <i className="fas fa-sort-down"></i>
                    Lists
                    <div className="lists-subcat">
                      {showLists ? (
                        data.user.lists.map(list => (
                          <Link to={`list/${list.name}`}>{list.name}</Link>
                        ))
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </div>
                <div className="left-nav-tags-container">
                  <div onClick={this.toggleTags}>
                    <i className="fas fa-sort-down"></i>
                    Tags
                    <div className="tags-subcat">
                      {showTags ? (
                        data.user.tags.length !== 0 ? (
                          data.user.tags.map(tag => (
                            <Link to={`tag/${tag.name}`}>{tag.name}</Link>
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
                <div className="left-nav-locations-container">
                  <div onClick={this.toggleLocations}>
                    <i className="fas fa-sort-down"></i>
                    Locations
                    <div className="locations-subcat">
                      {showLocations ? (
                        data.user.locations.length !== 0 ? (
                          data.user.locations.map(location => (
                            <Link to={`location/${location.name}`}>
                              {location.name}
                            </Link>
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
  render() {
    return <div></div>;
  }
}