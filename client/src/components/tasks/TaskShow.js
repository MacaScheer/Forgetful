import React, {Component} from "react";
import {Query} from "react-apollo"
import FETCH_TASK from "../../graphql/queries"

const TaskShow = props => {
    render() {
        return(
            <Query query={FETCH_TASK} variables={{id: props.match.params.id}}>
                {({loading, error, data}) => {
                if (loading) return <p> Loading...</p>;
                if (error) return <p> Error </p>;

                return (
                <div className="detail">
                    <NameDetail id={data.task.id} name={data.task.name} />
                </div>
                    )
                }}
            </Query>
        );
    }
}