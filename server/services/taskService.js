const keys = require("../../config/keys");
const Task = require("../models/Task");
const Tag = require("../models/Tag");
const List = require("../models/List");

// const validateTaskInput = require("../validation/task");

const checkTaskUniqueness = async data => {
  try {
    const { name } = data;
    const existingTask = await Task.findOne({ name });
    if (existingTask) throw new Error("This task already exists");
    const { due_date } = data;
    const { start_date } = data;
    if (!due_date) due_date = "never";
    if (!start_date) start_date = "today";

    const task = new Task(
      {
        name,
        body,
        due_date,
        start_date,
        priority,
        repeat,
        location,
        tags: { tag: "personal" }
      },
      err => {
        if (err) throw err;
      }
    );
    //   validateTaskInput(task)
    task.save();
  } catch (err) {
    throw err;
  }
};

const checkTagUniqueness = async data => {
  try {
    const { name } = data;
    const existingTag = await Tag.findOne({ name });
    if (existingTag) throw new Error("This tag already exists");

    const tag = new Tag(name);
    tag.save();
  } catch (err) {
    throw err;
  }
};

const checkListUniqueness = async data => {
  try {
    const { name } = data;
    const existingList = await List.findOne({ name });
    if (existingList) throw new Error("This list already exists");

    const { tasks } = data;
    const list = new List(name, tasks);
    list.save();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  checkTaskUniqueness,
  checkTagUniqueness,
  checkListUniqueness
};
