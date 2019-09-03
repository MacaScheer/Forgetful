import "../stylesheets/task_index.scss";
import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
import Taskline from './TaskLine'
const { FETCH_USER } = Queries;

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      completed: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleChange= this.handleChange.bind(this)
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

  handleChange(e){
    e.preventDefault();

    this.setState({
      completed: !this.state.completed
    })
  }

  render() {
    const cid = localStorage.getItem("currentuserId")
    // debugger
    return (
      <Query query={FETCH_USER} variables={{ Id: cid }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          // debugger
          if (data.user.tasks) {
            return (
              <div className="task-list-container">
                <div className="task-list">
                  {data.user.tasks.map((task, i) => (
                    <div className="task-list-item" key={i}>
                      <Taskline  _id={task._id} name={task.name}/>
                    </div>
                  ))}
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

export default withRouter(TaskIndex);
