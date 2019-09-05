import React from "react";
import { withRouter } from "react-router-dom";
import "../stylesheets/searchbar.scss";
// import Queries from "../../graphql/queries";
// const { FETCH_USER } = Queries;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("userInput", this.state.input);
    this.props.history.push(`/search/${this.state.input}`);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    return (
      <form className="searchbar-form" onSubmit={this.handleSubmit}>
        <input
          id="filterInput"
          type="text"
          onChange={this.update("input")}
          placeholder="Search Tasks..."
          value={this.state.input}
        />
      </form>
    );
  }
}

export default withRouter(SearchBar);
