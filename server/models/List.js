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
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

ListSchema.statics.findTasks = listId => {
  const List = mongoose.model("lists");
  return List.findById(listId)
    .populate("tasks")
    .then(res => res.tasks);
};



module.exports = mongoose.model("lists", ListSchema);
