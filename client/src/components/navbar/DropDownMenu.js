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
      showLists: true,
      showTags: true,
      showLocations: true
    };

    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const button = document.getElementById("tasks-container");
    const summary = document.getElementById("right-side");

    summary.classList.add("move-over");
    button.classList.add("move-over");
  }

  toggle(e) {
    e.preventDefault();
    const classList = e.currentTarget.classList;
    switch (e.currentTarget.id) {
      case "rotate1":
        this.setState({ showInbox: !this.state.showInbox });
        if (this.state.showInbox) {
          classList.remove("unrotate");
          classList.add("rotate");
        } else {
          classList.remove("rotate");
          classList.add("unrotate");
        }
        return;
      case "rotate2":
        this.setState({ showLists: !this.state.showLists });
        if (this.state.showLists) {
          classList.remove("unrotate");
          classList.add("rotate");
        } else {
          classList.remove("rotate");
          classList.add("unrotate");
        }
        return;
      case "rotate3":
        this.setState({ showTags: !this.state.showTags });
        if (this.state.showTags) {
          classList.remove("unrotate");
          classList.add("rotate");
        } else {
          classList.remove("rotate");
          classList.add("unrotate");
        }
        return;
      case "rotate4":
        this.setState({ showLocations: !this.state.showLocations });
        if (this.state.showLocations) {
          classList.remove("unrotate");
          classList.add("rotate");
        } else {
          classList.remove("rotate");
          classList.add("unrotate");
        }
        return;
    }
  }

  renderInboxCat() {
    if (this.state.showInbox) {
      return (
        <div className="inbox-subcat">
          <Link to="/all">Inbox</Link>
          <Link to="/today">Today </Link>
          <Link to="/tomorrow">Tomorrow </Link>
          <Link to="/thisweek">This Week</Link>
          <Link to="/trash/trash">Trash</Link>
        </div>
      );
    }
  }

  render() {
    // debugger
    const cid = localStorage.getItem("currentuserId");
    const { showLists, showTags, showLocations } = this.state;
    return cid ? (
      <Query query={FETCH_USER} variables={{ Id: cid }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user) {
            return (
              <div
                className={!this.props.dropdown ? "left-nav-container st-effect-13 slide" : "left-nav-container st-effect-13 new-slide"}
                id="st-container"
              >
                <div className="left-nav-inbox-container">
                  <img className="nav-icon" src={require("../splashpage/favicon1.ico")} />
                  {/* <h2 className="title">Forgetful</h2> */}

                  <i
                    id="rotate1"
                    onClick={this.toggle}
                    className="fas fa-sort-down icons"
                  ></i>
                  {this.state.toggle ? (
                    <Link to="/lists/inbox" className="drop-headers">
                      <span className="drop-headers">Inbox</span>
                    </Link>
                  ) : (
                    <Link to="/all">
                      <span className="drop-headers">All Tasks</span>
                    </Link>
                  )}
                  {this.renderInboxCat()}
                </div>
                <div className="left-nav-lists-container" id="st-container">
                  <div>
                    <i
                      className="fas fa-sort-down icons"
                      id="rotate2"
                      onClick={this.toggle}
                    ></i>
                    <span className="drop-headers">Lists</span>
                  </div>
                  <div className="lists-subcat">
                    {showLists ? (
                      data.user.lists.map((list, i) => (
                        <Link to={`/lists/${list.name}`} key={i}>
                          {list.name}
                        </Link>
                      ))
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
                <div className="left-nav-tags-container" id="st-container">
                  <div>
                    <i
                      className="fas fa-sort-down icons"
                      id="rotate3"
                      onClick={this.toggle}
                    ></i>
                    <span className="drop-headers">Tags</span>
                  </div>
                  <div className="tags-subcat">
                    {showTags ? (
                      data.user.tags.length !== 0 ? (
                        data.user.tags.map((tag, i) => (
                          <Link to={`/tags/${tag.name}`} key={i}>
                            {tag.name}
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

                <div className="left-nav-locations-container">
                  <div>
                    <i
                      className="fas fa-sort-down icons"
                      id="rotate4"
                      onClick={this.toggle}
                    ></i>
                    <span className="drop-headers">Locations</span>
                    <div className="locations-subcat">
                      {showLocations ? (
                        data.user.locations.length !== 0 ? (
                          data.user.locations.map((location, i) => (
                            <Link to={`/locations/${location.name}`} key={i}>
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
    ) : <div/>;
  }
}
