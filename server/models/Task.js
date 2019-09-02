const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tags"
    }
  ],
  list: {
    type: Schema.Types.ObjectId,
    ref: "lists"
  },
  name: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  due_date: {
    type: String,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  repeat: {
    type: String
  },
  location: {
    type: String
  }
});

TaskSchema.statics.updateTaskList = (taskId, listId) => {
  const List = mongoose.model("lists");
  const Task = mongoose.model("tasks");

  return Task.findById(taskId).then(task => {
    if (task.list) {
      List.findById(task.list).then(oldlist => {
        oldlist.tasks.pull(task);
        return oldlist.save();
      });
    }
    return List.findById(listId).then(newList => {
      task.list = newList;
      newList.tasks.push(task);
      return Promise.all([task.save(), newList.save()]).then(
        ([task, newList]) => task
      );
    });
  });
};

TaskSchema.statics.updateTaskTag = (taskId, tagId) => {
  const Tag = mongoose.model("tags");
  const Task = mongoose.model("tasks");

  Task.findById(taskId).then(task => {
    return Tag.findById(tagId).then(newTag => {
      task.tags.push(newTag);
      newTag.tasks.push(task);

      return Promise.all([task.save(), newTag.save()]).then(
        ([task, newTag]) => task
      );
    });
  });
};
module.exports = mongoose.model("tasks", TaskSchema);
