const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
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

TagSchema.statics.findTasks = tagId => {
  const Tag = mongoose.model("tags");
  return Tag.findById(tagId)
    .populate("tasks")
    .then(res => res.tasks);
};

module.exports = mongoose.model("tags", TagSchema);
