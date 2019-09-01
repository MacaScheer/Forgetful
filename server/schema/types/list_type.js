const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const TaskType = require("./task_type");
const List = require("../../models/List");

const ListType = new GraphQLObjectType({
  name: "ListType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(require("./task_type")),
      resolve(parentValue) {
        return List.FindTasks(parentValue._id);
      }
    }
  })
});

module.exports = ListType;
