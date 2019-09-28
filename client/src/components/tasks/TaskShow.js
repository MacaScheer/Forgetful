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
  }


  render() {
    const id = this.props.taskId;

    return (
      <Query query={FETCH_TASK} variables={{ Id: id }} fetchPolicy={"cache-and-network"}>
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
                    id={this.props.taskId}
                    start_date={data.task.start_date}
                  />
                  <DueDateDetail
                    id={data.task._id}
                    due_date={data.task.due_date}
                  />

                  <ListDetail id={data.task._id} list={data.task.list} />
                  <TagDetail id={data.task._id} tags={data.task.tags} />
                  {/* <RepeatDetail id={data.task._id} ={data.task.repeat} /> */}
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
