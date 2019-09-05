const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const mongoose = require("mongoose");
require("../models/index");
const User = mongoose.model("users");
const Task = mongoose.model("tasks");
const List = mongoose.model("lists");
const Tag = mongoose.model("tags");
const Location = mongoose.model("locations");

const UserType = require("./types/user_type");
const TaskType = require("./types/task_type");
const ListType = require("./types/list_type");
const TagType = require("./types/tag_type");
const LocationType = require("./types/location_type");
const TaskService = require("../services/taskService");
const AuthService = require("../services/auth");
const LocationService = require("../services/locationService");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newTask: {
      type: TaskType,
      args: {
        name: { type: GraphQLString }, //required
        body: { type: GraphQLString }, //should be changed to required false
        due_date: { type: GraphQLString }, //should be changed to required false
        priority: { type: GraphQLString }, //should be changed to required false
        repeat: { type: GraphQLString }, //not required
        location: { type: GraphQLString }, //not required
        tags: { type: GraphQLString },
        list: { type: GraphQLString }
      },
      resolve(_, { name, body, due_date, priority, repeat, location, list }) {
        return TaskService.checkTaskUniqueness({
          name,
          body,
          due_date,
          priority,
          repeat,
          location,
          list
        });
      }
    },
    updateTask: {
      type: TaskType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        due_date: { type: GraphQLString },
        body: { type: GraphQLString },
        priority: { type: GraphQLString },
        repeat: { type: GraphQLString },
        location: { type: GraphQLString }
      },
      resolve(_, args) {
        TaskService.updateTask(args);
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
        userId: { type: GraphQLID }
      },
      resolve(_, args) {
        return TaskService.checkListUniqueness(args).then(
          ({ listId, userId }) => User.updateList(listId, userId)
        );
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
        return TaskService.checkTagUniqueness(args).then(({ tagId, userId }) =>
          User.updateTag(tagId, userId)
        );
        // return new Tag({ name }).save();
      }
    },
    newLocation: {
      type: LocationType,
      args: {
        name: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(_, args) {
        return LocationService.checkAndCreate(args);
      }
    },
    deleteLocation: {
      type: LocationType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Location.remove({ _id });
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

    moveToTrash: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
        taskId: { type: GraphQLString },
        listId: { type: GraphQLString },
        tagId: { type: GraphQLString },
        locationId: { type: GraphQLString }
      },
      resolve(_, args) {
        return TaskService.moveToTrash(args);
      }
    },

    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
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
