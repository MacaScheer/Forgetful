const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLDate,
  GraphQLList
} = graphql;
const User = mongoose.model("users");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    date: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    defaultListObjectId: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(require("./task_type")),
      resolve(parentValue) {
        return User.findTasks(parentValue._id);
      }
    },
    tags: {
      type: new GraphQLList(require("./tag_type")),
      resolve(parentValue) {
        return User.findTags(parentValue._id);
      }
    },
    lists: {
      type: new GraphQLList(require("./list_type")),
      resolve(parentValue) {
        return User.findLists(parentValue._id);
      }
    },
    trash: {
      type: new GraphQLList(require("./task_type")),
      resolve(parentValue) {
        return User.findTrash(parentValue._id);
      }
    }
  })
});

module.exports = UserType;
