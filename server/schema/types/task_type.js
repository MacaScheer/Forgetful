const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

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
      resolver(parentValue) {
        return Task.findById(parentValue._id)
          .populate("user")
          .then(task => {
            return task.user;
          });
      }
    },
    tag: {
      type: require("./tag_type"),
      resolver(parentValue) {
        return Task.findById(parentValue._id)
          .populate("tag")
          .then(task => {
            return task.tag;
          });
      }
    },
    list: {
      type: require("./list_type"),
      resolver(parentValue) {
        return Task.findById(parentValue._id)
          .populate("list")
          .then(task => {task.list;});
      }
    }
  })
});

module.exports = TaskType;

//EXAMPLE:
// category: {
//     type: require("./category_type"),
//     resolver(parentValue) {
//         return ProductType.findById(parentValue._id)
//             .populate("category")
//             .then(task => {
//                 return task.category;
//             });
//     }
// }
