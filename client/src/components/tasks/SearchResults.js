import "../stylesheets/task_index.scss";
import Fuse from "fuse.js";
import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
import Taskline from "./TaskLine";
import TaskIndex from "./TaskIndex";
const { FETCH_USER } = Queries;

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  runSearchResult(tasks) {
    let input = localStorage.getItem("userInput");
    const options = {
      keys: ["due_date", "body", "name"],
      shouldSort: true,
      tokenize: true,
      findAllMatches: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1
    };
    let fuse = new Fuse(tasks, options);
    let result = fuse.search(input);
    return result;
  }

  render() {
    return (
      <Query
        query={FETCH_USER}
        variables={{ Id: localStorage.getItem("currentuserId") }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user.tasks) {
            return (
              <div className="tasks-container" id="tasks-container">
                <div className="task-list-container">
                  <div className="task-list">
                    {this.runSearch(data.user.tasks).map((filteredTask, i) => (
                      <div className="task-list-item" key={i}>
                        <Taskline
                          _id={filteredTask._id}
                          name={filteredTask.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default withRouter(SearchResults);
