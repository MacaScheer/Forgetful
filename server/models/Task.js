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
  location: {
    type: Schema.Types.ObjectId,
    ref: 'locations'
  },
  name: {
    type: String,
    required: true
  },
  body: {
    type: String,
  },
  due_date: {
    type: String,
  },
  start_date: {
    type: String,
  },
  priority: {
    type: String,
  },
  repeat: {
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
    })
      // .then(res => console.log(`res = ${res}`));
  });
};

TaskSchema.statics.updateTaskLocation = (taskId, locationId) => {
  const Location = mongoose.model("locations");
  const Task = mongoose.model("tasks");

  return Task.findById(taskId).then(task => {
    if (task.list) {
      Location.findById(task.location).then(oldlocation => {
        oldlocation.tasks.pull(task);
        return oldlocation.save();
      });
    }
    return Location.findById(locationId).then(newLocation => {
      task.location = newLocation;
      newLocation.tasks.push(task);
      return Promise.all([task.save(), newLocation.save()]).then(
        ([task, newLocation]) => task
      );
    })
    // .then(res => console.log(`res = ${res}`));
  });
};




TaskSchema.statics.updateTaskTag = (taskId, tagId) => {
  const Tag = mongoose.model("tags");
  const Task = mongoose.model("tasks");

  Task.findById(taskId).then(task => {
    // console.log(task.tags);
    return Tag.findById(tagId).then(newTag => {
      // console.log(newTag);
      // console.log(task);
      if (!task.tags.includes(tagId)){
        task.tags.push(newTag);
        newTag.tasks.push(task);

      }

      return Promise.all([task.save(), newTag.save()]).then(
        ([task, newTag]) => task
      );
    });
  });
  // return Task.findById(taskId).then(task => {
  //   console.log(task.tags);
  //   if (!task.tags.includes())
    // if (task.tag) {
    //   Location.findById(task.location).then(oldlocation => {
    //     oldlocation.tasks.pull(task);
    //     return oldlocation.save();
    //   });
    // }
    // return Location.findById(locationId).then(newLocation => {
    //   task.location = newLocation;
    //   newLocation.tasks.push(task);
    //   return Promise.all([task.save(), newLocation.save()]).then(
    //     ([task, newLocation]) => task
    //   );
    // })
    // .then(res => console.log(`res = ${res}`));
  // });
};
module.exports = mongoose.model("tasks", TaskSchema);
