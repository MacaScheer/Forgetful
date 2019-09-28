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
        name: { type: GraphQLString },
        due_date: { type: GraphQLString },
        start_date: { type: GraphQLString },
        locationId: { type: GraphQLString },
        tagId: { type: GraphQLString },
        listId: { type: GraphQLString },
        userId: { type: GraphQLString }
      },
      resolve(_, args) {
        return TaskService.createTask(args);
      }
    },
    //
    updateTask: {
      type: TaskType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        due_date: { type: GraphQLString },
        start_date: { type: GraphQLString },
        body: { type: GraphQLString },
        priority: { type: GraphQLString },
        repeat: { type: GraphQLString },
        location: { type: GraphQLString }
      },
      resolve(_, args) {
        return TaskService.updateTask(args);
      }
    },
    updateTaskList: {
      type: TaskType,
      args: {
        taskID: { type: GraphQLID },
        listID: { type: GraphQLID }
      },
      resolve(_, { taskID, listID }) {
        return Task.updateTaskList(taskID, listID);
      }
    },
    updateTaskLocation: {
      type: TaskType,
      args: {
        taskID: { type: GraphQLID },
        locationID: { type: GraphQLID }
      },
      resolve(_, { taskID, locationID }) {
        return Task.updateTaskLocation(taskID, locationID);
      }
    },
    updateTaskTag: {
      type: TagType,
      args: {
        taskID: { type: GraphQLID },
        tagID: { type: GraphQLID }
      },
      async resolve(_, { taskID, tagID }) {
        const response = await Task.updateTaskTag(taskID, tagID);
        console.log(response);
        return response;
      }
    },
    deleteTask: {
      type: TaskType,
      args: { _id: { type: GraphQLID } },
      resolve(_, args) {
        console.log(args);
        console.log(args._id);
        return Task.deleteOne({ _id: args._id }).then(() => {
          return args._id;
        });
      }
    },
    newList: {
      type: ListType,
      args: {
        name: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(_, args) {
        return TaskService.checkListUniqueness(args);
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
      },
      resolve(_, args) {
        return TaskService.checkTagUniqueness(args);
        //   .then(res => {
        //   console.log("res:", res);
        // });
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
