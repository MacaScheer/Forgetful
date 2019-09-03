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
    }
    // tags: {type: GraphQLList}, //
    // lists: {type: GraphQLList} // import
  
  })
});

module.exports = UserType;
