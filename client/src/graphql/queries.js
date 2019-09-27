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
          start_date
        }
        tags {
          tasks {
            _id
            name
          }
          name
          _id
        }
        lists {
          name
          _id
          tasks {
            _id
            name
          }
        }

        trash{
          _id
          name
        }
        locations{
          _id

          name
          tasks{
            _id
            name
          }
        }
      }
    }
  `,
  FETCH_USER_TASKS: gql`
  query FetchUserTasks( $Id: ID!){
    user(_id: $Id){
      tasks{
        name
      }
    }
  }
  `,
 
  FETCH_TASK: gql`
    query FetchTask($Id: ID!) {
      task(_id: $Id) {
        _id
        name
        due_date
        body
        start_date
        priority
        repeat
        list{
          _id
          name
        }
        tags{
          name
          _id
        }
        location{
          _id
          name
        }
      }
    }
  `,
  FETCH_TASKS: gql`
  query FetchTasks{
    tasks{
      name
      _id
    }
  }
  `,

  SEARCH_RESULTS: gql`
    query searchResult {
      searchResults @client
    }
  `
};
