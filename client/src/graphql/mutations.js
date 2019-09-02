import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
        name
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($email: String!, $password: String!, $name: String!) {
      register(email: $email, password: $password, name: $name) {
        token
        loggedIn
        name
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  // CREATE_TASK: gql`
  //   mutation  newTask($name: String!, 
  //     $body: String, 
  //     $tags: String, 
  //     $list: String, 
  //     $due_date: String, 
  //     $start_date: String, 
  //     $location: String, 
  //     $priority: String,
  //     $repeat: String
  //     $user: String){
  //       newTask(name: $name, 
  //       body: $body, 
  //       tags: $tags, 
  //       list: $list, 
  //       due_date: $due_date, 
  //       start_date: $start_date, 
  //       location: $location, 
  //       priority: $priority,
  //       repeat: $repeat,
  //       user: $user}
  //       ) {
  //         name
  //       }
  //     }
  // `

};
