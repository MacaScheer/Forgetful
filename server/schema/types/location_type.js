const mongoose = require("mongoose");
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const Location = mongoose.model('locations')
const LocationType = new GraphQLObjectType({
  name: "LocationType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(require('./task_type')),
      resolve(parentValue) {
        return Location.findTasks(parentValue._id)
      }
    }
  })
})

module.exports = LocationType;