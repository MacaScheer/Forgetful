// const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const TaskType = new GraphQLObjectType({
  name: "TaskType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    body: { type: GraphQLString },
    start_date: { type: GraphQString },
    due_date: { type: GraphQString },
    priority: { type: GraphQString },
    repeat: { type: GraphQString },
    location: { type: GraphQString },
    user: {
      type: require("./user_type"),
      resolver(parentValue) {
        return TaskType.findById(parentValue._id)
          .populate("user")
          .then(task => {
            return task.user;
          });
      }
    },
    tag: {
      type: require("./tag_type"),
      resolver(parentValue) {
        return TaskType.findById(parentValue._id)
          .populate("tag")
          .then(task => {
            return task.tag;
          });
      }
    },
    list: {
      type: require("./list_type"),
      resolver(parentValue) {
        return TaskType.findById(parentValue._id)
          .populate("list")
          .then(task => {
            return task.list;
          });
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
