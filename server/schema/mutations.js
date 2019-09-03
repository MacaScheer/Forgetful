const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const mongoose = require("mongoose");
require("../models/index");
const UserType = require("./types/user_type");
const User = mongoose.model("users");
const TaskType = require("./types/task_type");
const Task = mongoose.model("tasks");
const ListType = require("./types/list_type");
const List = mongoose.model("lists");
const TagType = require("./types/tag_type");
const Tag = mongoose.model("tags");

const TaskService = require("../services/taskService");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newTask: {
      type: TaskType,
      args: {

        name: { type: GraphQLString }, //required
        body: { type: GraphQLString }, //should be changed to required false
        due_date: { type: GraphQLString }, //should be changed to required false
        start_date: { type: GraphQLString }, //should be changed to required false
        priority: { type: GraphQLString },//should be changed to required false
        repeat: { type: GraphQLString }, //not required
        location: { type: GraphQLString }, //not required
        tags: { type: GraphQLString },
        list: { type: GraphQLString },

      },
      resolve(
        _,
        { name, body, due_date, start_date, priority, repeat, location, list }
      ) {
        return TaskService.checkTaskUniqueness({
          name,
          body,
          due_date,
          start_date,
          priority,
          repeat,
          location,
          list
        });
      }
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
        name: { type: GraphQLString },
        userId: {type: GraphQLID}
      },
      resolve(_, args) {
        
        return TaskService.checkListUniqueness(args)
          .then(({ listId, userId }) => User.updateList(listId, userId))
        // return new List({ name }).save();
      }
    },
    deleteList: {
      type: ListType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return List.remove({ _id });
      }
    },
    newTag: {
      type: TagType,
      args: {
        name: { type: GraphQLString },
        userId: { type: GraphQLID }

        // tasks: { type: GraphQLList }
      },
      resolve(_, args) {
        return TaskService.checkTagUniqueness(args)
          .then(({ tagId, userId }) => User.updateTag(tagId, userId));
        // return new Tag({ name }).save();
      }
    },
    deleteTag: {
      type: TagType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Tag.remove({ _id });
      }
    },
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
    },

    updateUser: {
      type: UserType,
      args: {
        id: {type: GraphQLID},
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        // return AuthService.updateUser({args});
        const updateObj = {};
        const { id, name, email, password } = args;
        updateObj.id = id;
        if (name) updateObj.name = name;
        if (email) updateObj.email = email;
        if (password) udpateObj.password = password;

        return User.findOneAndUpdate(
          { _id: args.id },
          { $set: updateObj },
          { new: true },
          (err, user) => {
            return user;
          }
        );
      }
    }
  }
});

module.exports = mutation;
