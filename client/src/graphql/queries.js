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
          _id
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
        locations{
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
  FETCH_TASK: gql`
    query FetchTask($Id: ID!){
      task(_id: $Id){
        _id
        name
        due_date
        body
        start_date
        priority
        repeat
        location
      }
    }
  `,
  SEARCH_RESULTS: gql`
    query searchResult {
      searchResults @client
    }
  `
};
