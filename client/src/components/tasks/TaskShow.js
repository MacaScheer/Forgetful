import React, { Component } from "react";
import { Query } from "react-apollo";
import queries from "../../graphql/queries";
import NameDetail from "../details/NameDetail";
import "../stylesheets/showpage_css.scss";
import DueDateDetail from "../details/DueDateDetail";
import BodyDetail from "../details/BodyDetail";
import PriorityDetail from "../details/PriorityDetail";
import RepeatDetail from "../details/RepeatDetail";
import LocationDetail from "../details/LocationDetail";
import { withRouter } from "react-router-dom";
import ListDetail from "../details/ListDetail";
import TagDetail from "../details/TagDetail";
import StartDateDetail from "../details/StartDateDetail";

const { FETCH_TASK } = queries;

class TaskShow extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   id: props.taskId
    // };
  }
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.taskId !== this.props.taskId) {
  //     this.setState({
  //       id: nextProps.taskId
  //     });
  //     console.log("nextProps", nextProps.taskId);
  //     console.log("props.taskId", this.props.taskId);
  //     return true;
  //   }
  //   return false
  // }

  render() {
    const id = this.props.taskId;

    return (
      <Query query={FETCH_TASK} variables={{ Id: id }} fetchPolicy={"no-cache"}>
        {({ loading, error, data }) => {
          if (loading) return <p> Loading...</p>;
          if (error) return `Error! ${error.message}`;
          let tags = data.task.tags;

          debugger;
          return (
            <div className="task-show-content">
              <div className="task-show">
                <NameDetail id={data.task._id} name={data.task.name} />
                <div className="task-show-info">
                  <StartDateDetail
                    id={data.task._id}
                    start_date={data.task.start_date}
                  />
                  <DueDateDetail
                    id={data.task._id}
                    due_date={data.task.due_date}
                  />

                  <ListDetail id={data.task._id} list={data.task.list} />
                  <TagDetail id={data.task._id} tags={data.task.tags} />
                  {/* <PriorityDetail
                  id={data.task._id}
                  priority={data.task.priority}
                /> */}
                  {/* <RepeatDetail id={data.task._id} repeat={data.task.repeat} /> */}
                  <LocationDetail
                    id={data.task._id}
                    location={data.task.location}
                  />
                  <BodyDetail id={data.task._id} body={data.task.body} />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(TaskShow);
