const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const Task = mongoose.model("tasks");

const TaskType = new GraphQLObjectType({
  name: "TaskType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    body: { type: GraphQLString },
    start_date: { type: GraphQLString },
    due_date: { type: GraphQLString },
    priority: { type: GraphQLString },
    repeat: { type: GraphQLString },
    location: { type: GraphQLString },
    user: {
      type: require("./user_type"),
      resolve(parentValue) {
        return Task.findById(parentValue._id)
          .populate("user")
          .then(task => {
            return task.user;
          });
      }
    },
    tags: {
      type: new GraphQLList(require("./tag_type")),
      resolve(parentValue) {
        return Task.findById(parentValue._id)
          .populate("tags") // plural??
          .then(task => {
            return task.tags;
          });
      }
    },
    list: {
      type: require("./list_type"),
      resolve(parentValue) {
        return Task.findById(parentValue._id)
          .populate("list")
          .then(task => {
            return task.list; //question for monday
          });
      }
    }
  })
});

module.exports = TaskType;
