import React from "react";
import { Link } from "react-router-dom";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let results = this.state.narrowedSearch.map(task => {
      <Link to={`/tasks/${this.props.task._id}`}>
        <div>
          {task.name}
          <br />
          {task.description}
        </div>
      </Link>;
    });
    return <div>{results}</div>;
  }
}

export default SearchResult;
