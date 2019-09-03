import gql from "graphql-tag";

export default {

  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  ALL_TASKS: gql`
    {
      tasks{
        name
        _id
        tags{
          name
        }
        list{
          name
        }
        body
        due_date
        start_date
      }
    }
  `
}
