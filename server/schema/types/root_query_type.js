const mongoose = require("mongoose");
const graphql = require("graphql");
const secrets = require("../../../config/keys");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const ListType = require("./list_type");
const TaskType = require("./task_type");
const TagType = require("./tag_type");

const User = mongoose.model("users");
const Tag = mongoose.model("tags");
const List = mongoose.model("lists");
const Task = mongoose.model("tasks");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        return Task.find({});
      }
    },
    task: {
      type: TaskType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Task.findById(args._id);
      }
    },
    lists: {
      type: new GraphQLList(ListType),
      resolve() {
        return List.find({});
      }
    },
    list: {
      type: ListType,
      args: { _id: { type: GraphQLID } },
      resolve(_, args) {
        return List.findById(args._id)
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve() {
        return Tag.find({});
      }
    },
    tag: {
      type: TagType,
      args: { _id: { type: GraphQLID } },
      resolve(_, args) {
        return Tag.findById(args._id)
      }
    }
    })
});

module.exports = RootQueryType;
