const keys = require("../../config/keys");
const mongoose = require("mongoose");
const Task = mongoose.model("tasks");
const Tag = mongoose.model("tags");
const List = mongoose.model("lists");
const User = mongoose.model("users");

// const graphql = require("graphql");
// const { GraphQLList } = graphql;

// const validateTaskInput = require("../validation/task");

const checkTaskUniqueness = async data => {
  try {
    let {
      name,
      body,
      due_date,
      start_date,
      priority,
      repeat,
      location,
      list,
      user
    } = data;

    const existingTask = await Task.findOne({ name });
    // let today = new Date();
    const newuser = await User.findById("5d6fe15de82b4832bb6b9f20");
    // const newlist = await List.findById("5d6fe15de82b4832bb6b9f1d")
    console.log(newuser);
    // console.log(newlist)
    if (existingTask) throw new Error("This task already exists");

    if (!due_date) due_date = "never";
    if (!start_date) start_date = today;
    // if (!list) list = "5d6fe15de82b4832bb6b9f1d"
    // if (!user) user = "5d6fe15de82b4832bb6b9f20"
    // if (!list) list = localStorage.getItem(defaultListObjectId);
    const task = await new Task(
      {
        name,
        body,
        due_date,
        start_date,
        priority,
        repeat,
        location,
        list,
        user
      },
      err => {
        if (err) throw err;
      }
    );
    // newlist.tasks.push(task._id)
    // newuser.tasks.push(task._id)
    // newlist.save()
    // newuser.save()
    task.save();
    return task._id;
  } catch (err) {
    throw err;
  }
};

const checkTagUniqueness = async data => {
  try {
    const { name, userId } = data;
    const existingTag = await Tag.findOne({ name });
    if (existingTag) throw new Error("This tag already exists");

    const tag = await new Tag({ name, userId });
    tag.save();
    tagId = tag._id;

    return { tagId, userId };
  } catch (err) {
    throw err;
  }
};

const checkListUniqueness = async data => {
  try {
    const { name, userId } = data;
    const existingList = await List.findOne({ name });

    if (existingList) throw new Error("This list already exists");

    const list = await new List({ name, userId });

    // User.findByIdAndUpdate({ _id: userId }, { lists: })
    list.save();
    listId = list._id;
    // console.log(listId)
    return { listId, userId };
  } catch (err) {
    throw err;
  }
};

const moveToTrash = async data => {
  try {
    const { userId, taskId, listId, tagId } = data;
    const user = await User.findById(userId);

   
      const list = await List.findById(listId);
    
    
      const tag = await Tag.findById(tagId);
    
    
    await user.tasks.pull(taskId);
    await list !== null ? list.tasks.pull(taskId) : null
    await tag !== null ? tag.tasks.pull(taskId) : null

    // await user.lists.forEach((list) => list.tasks.remove({ id: taskId }));
    // await user.tags.forEacH(tag => tag.tasks.remove({ id: taskId }));
    // console.log(arrayofTasks);
    user.trash.push(taskId);
    user.save()
    list.save()

    return user;
  } catch (err) {
    throw err;
  }
};

const updateTask = async data => {
  // try {
  //   const { _id, name, due_date, body } = data
  //   // console.log(_id)
  //   const existingTask = await Task.findById(_id);

  //   await name !== null ? existingTask.name = name : null;
  //   await due_date !== null ? existingTask.due_date = due_date : null;
  //   await body !== null ? existingTask.body = body : null;
  //   // console.log(name)
  //   existingTask.save()
  //   return existingTask
    
  // } catch (err) {
  //   throw err
  // }
  const updateObj = {};

  const { _id, name, due_date, body, priority, repeat, location } = data;
  if (_id) updateObj._id = _id;
  if (name) updateObj.name = name;
  if (due_date) updateObj.due_date = due_date;
  if (body) updateObj.body = body;
  if (priority) updateObj.priority = priority;
  if (repeat) updateObj.repeat = repeat;
  if (location) updateObj.location = location;


  return Task.findOneAndUpdate(
    { _id: _id },
    { $set: updateObj },
    { new: true },
    (err, task) => {
      return task;
    }
  );
}

module.exports = {
  checkTaskUniqueness,
  checkTagUniqueness,
  checkListUniqueness,

  updateTask,

  moveToTrash

};
