const keys = require("../../config/keys");
const mongoose = require("mongoose");
const Task = mongoose.model('tasks');
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
    console.log(newuser)
    // console.log(newlist)
    if (existingTask) throw new Error("This task already exists");

    if (!due_date) due_date =  "never" ;
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
    return task._id
  } catch (err) {
    throw err;
  }
};

const checkTagUniqueness = async data => {
  try {
    const { name, userId } = data;
    const existingTag = await Tag.findOne({ name });
    if (existingTag) throw new Error("This tag already exists");
    
    const tag = await new Tag({name, userId});
    tag.save();
    tagId = tag._id

    return { tagId, userId }
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
    listId = list._id 
    // console.log(listId)
    return { listId, userId}
  } catch (err) {
    throw err;
  }
};

module.exports = {
  checkTaskUniqueness,
  checkTagUniqueness,
  checkListUniqueness
};
