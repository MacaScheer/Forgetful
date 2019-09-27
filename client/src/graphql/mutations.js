import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
        name
        defaultListObjectId
        _id
      }
    }
  `,
  
  REGISTER_USER: gql`
    mutation RegisterUser($email: String!, $password: String!, $name: String!) {
      register(email: $email, password: $password, name: $name) {
        token
        loggedIn
        name
        defaultListObjectId
        _id
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
  CREATE_TAG: gql`
    mutation CreateTag($name: String, $userid: ID!) {
      newTag(name: $name, userId: $userid) {
        name
      }
    }
  `,
  CREATE_LIST: gql`
    mutation CreateList($name: String, $userid: ID!) {
      newList(name: $name, userId: $userid) {
        name
      }
    }
  `,
  CREATE_LOCATION: gql`
    mutation CreateLocation($name: String, $userid: ID!) {
      newLocation(name: $name, userId: $userid) {
        name
      }
    }
  `,

  CREATE_TASK: gql`
    mutation newTask(
      $name: String
      $due_date: String
      $start_date: String
      $locationId: String
      $tagId: String
      $listId: String
      $userId: String
    ) {
      newTask(
        name: $name
        due_date: $due_date
        start_date: $start_date
        locationId: $locationId
        tagId: $tagId
        listId: $listId
        userId: $userId
      ) {
        name
        _id
        due_date
        start_date
        
      }
    }
  `,
  UPDATE_TASK_NAME: gql`
    mutation updateTask($_id: ID, $name: String) {
      updateTask(_id: $_id, name: $name) {
        _id
        name
        due_date
      }
    }
  `,
  UPDATE_TASK_DUE_DATE: gql`
    mutation updateTask($_id: ID, $due_date: String) {
      updateTask(_id: $_id, due_date: $due_date) {
        _id
        due_date
      }
    }
  `,
  
  UPDATE_TASK_BODY: gql`
    mutation updateTaskbody($_id: ID, $body: String) {
      updateTask(_id: $_id, body: $body) {
        _id
        body
      }
    }
  `,
  UPDATE_TASK_PRIORITY: gql`
    mutation updateTask($_id: ID, $priority: String) {
      updateTask(_id: $_id, priority: $priority) {
        _id
        priority
      }
    }
  `,
  
  UPDATE_TASK_LIST: gql`
    mutation updateTaskList($taskID: ID, $listID: ID) {
      updateTaskList(taskID: $taskID, listID: $listID) {
        _id
        list {
          name
          _id
        }
      }
    }
  `,
  UPDATE_TASK_REPEAT: gql`
    mutation updateTask($_id: ID, $repeat: String) {
      updateTask(_id: $_id, repeat: $repeat) {
        _id
        repeat
      }
    }
  `,
  UPDATE_TASK_LOCATION: gql`
    mutation updateTaskLocation($taskID: ID, $locationID: ID) {
      updateTaskLocation(taskID: $taskID, locationID: $locationID) {
        _id
        location {
          name
          _id
        }
      }
    }
  `,
  UPDATE_TASK_TAG: gql`
    mutation updateTaskTag($taskID: ID, $tagID: ID) {
      updateTaskTag(taskID: $taskID, tagID: $tagID) {
       _id 
       name
      }
    }
  `,

  DELETE_TASK: gql`
    mutation deleteTask($id: ID) {
      deleteTask(_id: $id) {
        _id
      }
    }
  `
};
