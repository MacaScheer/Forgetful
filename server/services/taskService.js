const keys = require("../../config/keys");
const mongoose = require("mongoose");
const Task = mongoose.model("tasks");
const Tag = mongoose.model("tags");
const List = mongoose.model("lists");
const User = mongoose.model("users");
const Location = mongoose.model("locations");
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
    let today = new Date();
    const newuser = await User.findById("5d6fe15de82b4832bb6b9f20");
    // const newlist = await List.findById("5d6fe15de82b4832bb6b9f1d")
    console.log(newuser);
    // console.log(newlist)
    // if (existingTask) throw new Error("This task already exists");

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
    return {...task._doc};
  } catch (err) {
    throw err;
  }
};

const checkTagUniqueness = async data => {
  try {
    const { name, userId } = data;
  const user = await User.findById(userId);
  const tag = await new Tag({ name, userId });
  const tagId = await tag._id;
  const existingtags = await Tag.find({ name: name });
  existingtags.forEach(tag => {
    if (user.tags.includes(tag._id))
      throw new Error("This user already has this tag!");
  });

  user.tags.push(tagId);
  user.save();
  tag.save();
    return { ...tag._doc};
  } catch (err) {
    throw err;
  }
};

const checkListUniqueness = async data => {
  try {
    const { name, userId } = data;
    const user = await User.findById(userId);
    const list = await new List({ name, userId });
    const listId = await list._id;
    const existinglists = await List.find({ name: name });
    existinglists.forEach(list => {
      if (user.lists.includes(list._id))
        throw new Error("This user already has this list!");
    });

    user.lists.push(listId);
    user.save();
    location.save();
    return { ...list._doc };
  } catch (err) {
    throw err;
  }
};

const moveToTrash = async data => {
  try {
    const { userId, taskId, listId, tagId, locationId } = data;
    const user = await User.findById(userId);

    const list = await List.findById(listId);

    const tag = await Tag.findById(tagId);

    const location = await Location.findById(locationId);

    await user.tasks.pull(taskId);
    (await list) !== null ? list.tasks.pull(taskId) : null;
    (await tag) !== null ? tag.tasks.pull(taskId) : null;
    (await locations) !== null ? location.tasks.pull(taksId) : null;

    user.trash.push(taskId);
    user.save();
    list.save();

    return {...user._doc};
  } catch (err) {
    throw err;
  }
};

const updateTask = async data => {
  try {
    const { _id, name, due_date, body } = data;
    // console.log(_id)
    const existingTask = await Task.findById(_id);

    (await name) !== null ? (existingTask.name = name) : null;
    (await due_date) !== null ? (existingTask.due_date = due_date) : null;
    (await body) !== null ? (existingTask.body = body) : null;
    // console.log(name)
    existingTask.save();
    return { ...existingTask._doc };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  checkTaskUniqueness,
  checkTagUniqueness,
  checkListUniqueness,
  updateTask,
  moveToTrash
};
