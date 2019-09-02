import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
const { ALL_TASKS } = Queries;

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    const dropdown = document.getElementById("profile-dropdown");
    this.setState({
      hidden: !this.state.hidden
    });

    if (this.state.hidden) {
      dropdown.classList.remove("hide-dropdown");
    } else {
      dropdown.classList.add("hide-dropdown");
    }
  }

  render() {
    return (
      <Query query={ALL_TASKS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.tasks) {
            return (
              <div className="task-list-container">
                <ul className="task-list">
                  {data.tasks.map((task, i) => (
                    <li key={i} className="task-list-item">
                      {task.name}
                    </li>
                  ))}
                </ul>
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

export default withRouter(TaskIndex);
