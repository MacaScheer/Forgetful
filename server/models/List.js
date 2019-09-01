const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasks"
    }
  ]
});


ListSchema.statics.FindTasks = listId => {
  // const Task = mongoose.model("tasks");
  const List = mongoose.model("lists");
  return List.findById(listId)
    .populate("tasks")
    .then ( res => res.tasks)

};

// ListSchema.statics.FindTasks = function(listId) {
//   const Task = mongoose.model("tasks");
//   const List = mongoose.model("lists");
//   return Task.findById(listId).tasks;
// };

module.exports = mongoose.model("lists", ListSchema);
