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
ListSchema.statics.findTasks = listId => {
  const List = mongoose.model("lists")
  return List.findById(listId)
    .populate("tasks")
    .then(list => list.tasks);
  //   .catch(err => console.log(err));
};

// ListSchema.statics.FindTasks = function(listId) {
//   const Task = mongoose.model("tasks");
//   const List = mongoose.model("lists");
//   return Task.findById(listId).tasks;
// };

module.exports = mongoose.model("lists", ListSchema);
