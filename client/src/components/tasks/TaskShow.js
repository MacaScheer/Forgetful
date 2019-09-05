import React, { Component } from "react";
import {Query} from "react-apollo";
import queries from "../../graphql/queries";
import NameDetail from "../details/NameDetail";
import "../stylesheets/showpage_css.scss";
import DueDateDetail from "../details/DueDateDetail";
import BodyDetail from "../details/BodyDetail";

const {FETCH_TASK} = queries;

const TaskShow = props => {
        return(
            <Query query={FETCH_TASK} variables={{Id: props.match.params.id}}>
                {({loading, error, data}) => {
                if (loading) return <p> Loading...</p>;
                if (error) return <p> {error} </p>;
                    
    
                return (
                <div className="task-show-container">
                    <div className="task-show-content">
                        <NameDetail id={data.task._id} name={data.task.name} />
                        <DueDateDetail id={data.task._id} due_date={data.task.due_date} />
                        <BodyDetail id={data.task._id} body={data.task.body} />
                        <p>Start_Date: {data.task.start_date}</p>
                    </div>
                    
                </div>
                    );
                }}
            </Query>
        );

}

export default TaskShow;
