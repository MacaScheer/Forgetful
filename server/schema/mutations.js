const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = graphql;
const mongoose = require("mongoose");
require("../models/index");
const UserType = require("./types/user_type");
const User = mongoose.model("users");
const TaskType = require("./types/task_type");
const Task = mongoose.model("tasks");
const List = mongoose.model("lists");
const ListType = require("./types/list_type");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newTask: {
      type: TaskType,
      args: {
        name: { type: GraphQLString },
        body: { type: GraphQLString },
        due_date: { type: GraphQLString },
        start_date: { type: GraphQLString },
        priority: { type: GraphQLString },
        repeat: { type: GraphQLString },
        location: { type: GraphQLString }
      },
      resolve(
        _,
        { name, body, due_date, start_date, priority, repeat, location }
      ) {
        return new Task({
          name,
          body,
          due_date,
          start_date,
          priority,
          repeat,
          location
          //possibly add user?
        }).save();
      }
      //first search by task name to make sure no duplicates??
      //   async resolve(
      //     _,
      //     { name, body, due_date, start_date, priority, repeat, location },
      //     ctx
      //   ) {
      //     //making new task a protected mutation
      //     const validUser = await AuthService.verifyUser({ token: ctx.token });

      //     // if our service returns true then our product is good to save!
      //     // anything else and we'll throw an error
      //     if (validUser.loggedIn) {
      //       return new Task({
      //         name,
      //         body,
      //         due_date,
      //         start_date,
      //         priority,
      //         repeat,
      //         location
      //         //possibly add user?
      //       }).save();
      //     } else {
      //       throw new Error("Sorry, you need to be logged in to create a task.");
      //     }
      //   }
    },
    updateTaskList: {
      type: TaskType,
      args: {
        taskID: { type: GraphQLID },
        listID: { type: GraphQLID }
      },
      resolve(_, { taskID, listID }) {
        Task.updateTaskList(taskID, listID);
      }
      //   async resolve(_, { taskID, listID }, ctx) {
      //     const validUser = await AuthService.verifyUser({ token: ctx.token });
      //     if (validUser.loggedIn) {
      //       Task.updateTaskList(taskID, listID);
      //     } else {
      //       throw new Error("Sorry, you need to be logged in to create a task.");
      //     }
      //   }
    },

    updateTaskTag: {
      type: TaskType,
      args: {
        taskID: { type: GraphQLID },
        tagID: { type: GraphQLID }
      },
      resolve(_, { taskID, tagID }) {
        Task.updateTaskTag(taskID, tagID);
      }
    },

    deleteTask: {
      type: TaskType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Task.remove({ _id });
      }
    },
    newList: {
      type: ListType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(_, { name }) {
        return new List({name}).save();
      }
    },
    deleteList: {
      type: ListType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return List.remove({ _id });
      }
    },

    //   newTag,
    //      deleteTag

    //   newList,
    //   updateList,
    //   deleteList

    // newCategory: {
    //   type: CategoryType,
    //   args: {
    //     name: { type: GraphQLString }

    //   },
    //   resolve(parentValue, { name, products }) {
    //     return new Category({ name, products }).save();
    //   }
    // },
    // deleteCategory: {
    //   type: CategoryType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, { id }) {
    //     return Category.remove({ _id: id });
    //   }
    // },

    // deleteProduct: {
    //   type: ProductType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, { id }) {
    //     return Product.remove({ _id: id });
    //   }
    // },

    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        // all we need to log the user our is an id
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    }
  }
});

module.exports = mutation;

// mutation{
//     newTask(name: "Walk the dog", body: "make sure Benny relieves himself a few times and gets some exercise", due_date: "5pm today", start_date: "10am this morning", priority: "medium-high", repeat: "daily", location: "home"){
//         name
//         body
//         due_date
//         start_date
//         priority
//         repeat
//         location
//     }
// }

// mutation{
//   newTask(name: "Feed the fish", body: "Feed them till their bellies rupture", due_date: "5pm today", start_date: "5pm today", priority: "highest", repeat: "daily", location: "home"){
//     name
//     body
//     due_date
//     start_date
//     priority
//     repeat
//     location
//   }
// }
