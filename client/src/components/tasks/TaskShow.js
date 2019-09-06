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

const { FETCH_TASK } = queries;

const TaskShow = props => {
  return (
    <Query query={FETCH_TASK} variables={{ Id: props.taskId }}>
      {({ loading, error, data }) => {
        if (loading) return <p> Loading...</p>;
        if (error) return `Error! ${error.message}`;
        // debugger
        return (
          <div className="task-show-content">
            <div className="task-show">
              <NameDetail id={data.task._id} name={data.task.name} />
              <DueDateDetail id={data.task._id} due_date={data.task.due_date} />
              <BodyDetail id={data.task._id} body={data.task.body} />
              <PriorityDetail
                id={data.task._id}
                priority={data.task.priority}
              />
              <RepeatDetail id={data.task._id} repeat={data.task.repeat} />
              <LocationDetail
                id={data.task._id}
                location={data.task.location}
              />
              <p>Start_Date: {data.task.start_date}</p>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(TaskShow);
