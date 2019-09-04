import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_USER: gql`
    query FetchUser($Id: ID!) {
      user(_id: $Id) {
        tasks {
          name
          due_date
        }
        tags {
          tasks {
            name
          }
          name
          _id
        }
        lists {
          name
          _id
          tasks {
            name
          }
        }
        trash{
          name
        }
      }
    }
  `,
  ALL_TASKS: gql`
    {
      tasks {
        name
        _id
        tags {
          name
        }
        list {
          name
        }
        body
        due_date
        start_date
      }
    }
  `,
  SEARCH_RESULTS: gql`
    query searchResult {
      searchResults @client
    }
  `
};
