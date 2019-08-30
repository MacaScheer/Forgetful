const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const TaskType = require("./task_type");
const Tag = require("../../models/Tag");

const TagType = new GraphQLObjectType({
  name: "TagType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(TaskType),
      resolve(parentValue) {
        return Tag.FindTasks(parentValue._id);
      }
    }
  })
});

module.exports = TagType;
