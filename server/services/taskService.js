const keys = require("../../config/keys");
const mongoose = require("mongoose");
const Task = mongoose.model("tasks");
const Tag = mongoose.model("tags");
const List = mongoose.model("lists");
const User = mongoose.model("users");
const Location = mongoose.model("locations");

const createTask = async data => {
  try {
    let {
      name,
      due_date,
      start_date,
      locationId,
      tagId,
      listId,
      userId
    } = data;
    const existinguser = await User.findById(userId);
    const existinglist = listId
      ? await List.findById(listId)
      : console.log("nolist");
    const existingtag = tagId
      ? await Tag.findById(tagId)
      : console.log("notag");
    const existinglocation = locationId
      ? await Location.findById(locationId)
      : console.log("nolocation");
    const location = locationId ? locationId : null;
    const tag = tagId ? tagId : null;
    const list = listId ? listId : null;
    const user = userId ? userId : null;
    if (!due_date) due_date = "never";
    if (!start_date) start_date = "never";

    const task = new Task(
      {
        name,
        due_date,
        start_date,
        location,
        list,
        user
      },
      err => {
        if (err) throw new Error("herestheissue");
      }
    );
    if (tag) task.tags.push(tag);
    task.save();
    if (existinguser) existinguser.tasks.push(task._id);
    if (existinglist) existinglist.tasks.push(task._id);
    if (existingtag) existingtag.tasks.push(task._id);
    if (existinglocation) existinglocation.tasks.push(task._id);
    if (existinglist) existinglist.save();
    if (existingtag) existingtag.save();
    if (existinglocation) existinglocation.save();
    existinguser.save();
    console.log(task);
    return { ...task._doc };
  } catch (err) {
    throw err;
  }
};

const checkTagUniqueness = async data => {
  try {
    console.log("start");
    const { name, userId } = data;
    const tag = await new Tag({ name, userId });
    const user = await User.findById(userId);
    const tagId = await tag._id;
    const existingtags = await Tag.find({ name: name });
    existingtags.forEach(tag => {
      if (user.tags.includes(tag._id))
        throw new Error("This user already has this tag!");
    });

    user.tags.push(tagId);
    user.save();
    tag.save();
    console.log(tag);
    // return { ...tag._doc };
    return { ...tag._doc };
  } catch (err) {
    throw err;
  }
};

const checkListUniqueness = async data => {
  try {
    console.log("start");
    const { name, userId } = data;
    const user = await User.findById(userId);
    const list = await new List({ name, userId });
    const listId = list._id;
    const existinglists = await List.find({ name: name });
    existinglists.forEach(list => {
      if (user.lists.includes(list._id))
        throw new Error("This user already has this list!");
    });
    console.log("test2");
    user.lists.push(listId);
    user.save();
    list.save();
    console.log("complete");
    console.log(list);
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
    (await locations) !== null ? location.tasks.pull(taskId) : null;

    user.trash.push(taskId);
    user.save();
    list.save();

    return { ...user._doc };
  } catch (err) {
    throw err;
  }
};

const updateTask = async data => {
  try {
    const updateObj = {};

    const {
      _id,
      name,
      due_date,
      start_date,
      body,
      priority,
      repeat,
      location
    } = data;
    if (_id) updateObj._id = _id;
    if (name) updateObj.name = name;
    if (due_date) updateObj.due_date = due_date;
    if (start_date) updateObj.start_date = start_date;
    if (body) updateObj.body = body;
    if (priority) updateObj.priority = priority;
    if (repeat) updateObj.repeat = repeat;
    if (location) updateObj.location = location;

    return Task.findOneAndUpdate(
      { _id: _id },
      { $set: updateObj },
      { new: true },
      (err, task) => {
        // console.log(`task = ${task}`);
        return task;
      }
    );
    // .then(res => console.log(`res = ${res}`));
  } catch (err) {
    return err;
  }
};

module.exports = {
  createTask,
  checkTagUniqueness,
  checkListUniqueness,
  updateTask,
  moveToTrash
};
