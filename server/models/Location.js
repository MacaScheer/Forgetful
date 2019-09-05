const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tasks'
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }

})

LocationSchema.statics.findTasks = locationId => {
  const Location = mongoose.model("locations");
  return Location.findById(locationId)
    .populate("tasks")
    .then(res => res.tasks)
};

module.exports = mongoose.model("locations", LocationSchema)

