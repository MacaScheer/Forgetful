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

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
    // tasks: {type: GraphQLList},// import tasks type
    // tags: {type: GraphQLList}, //
    // lists: {type: GraphQLList} // import 
  })
});

module.exports = UserType;
