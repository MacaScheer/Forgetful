const keys = require("../../config/keys");
const Task = require("../models/Task");
const Tag = require("../models/Tag");
const List = require("../models/List");
const User = require("../models/User")
const mongoose = require("mongoose");

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
      list
    } = data;

    const existingTask = await Task.findOne({ name });

    if (existingTask) throw new Error("This task already exists");

    if (!due_date) due_date = { due_date: "never" };
    if (!start_date) start_date = { start_date: "today" };
    if (!list) list = localStorage.getItem(defaultListObjectId);
    const task = await new Task(
      {
        name,
        body,
        due_date,
        start_date,
        priority,
        repeat,
        location,
        list
      },
      err => {
        if (err) throw err;
      }
    );
    task.save();
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
