const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: "tags"
  },
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
    // if the product already had a category
    if (task.list) {
      // find the old category and remove this product from it's products
      List.findById(task.list).then(oldlist => {
        oldlist.tasks.pull(task);
        return oldlist.save();
      });
    }
      //need to make sure that oldList.save isn't happening at the same time as newList.save//
    //  find the Category and push this product in, as well as set this product's category
    //   throw new Error(taskId);
    return List.findById(listId).then(newList => {
      task.list = newList;
      newList.tasks.push(task);
      //   throw new Error(newList);
      //   console.log("task, newList:  ", task, newList);
    //   return task.save().then(() => newList.save());
        return Promise.all([task.save(), newList.save()]).then(
          ([task, newList]) => task
        );
    });
  });
};
module.exports = mongoose.model("tasks", TaskSchema);
