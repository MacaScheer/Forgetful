const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasks"
    }
  ],
  trash: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasks"
    }
  ],
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "lists"
    }
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tags"
    }
  ],
  defaultListObjectId: {
    type: String,
    required: true
  },
  locations: [
    {
      type: String
    }
  ]
});
UserSchema.statics.findTasks = userId => {
  const User = mongoose.model("users");
  return User.findById(userId)
    .populate("tasks")
    .then(res => res.tasks);
};
UserSchema.statics.findTags = userId => {
  const User = mongoose.model("users");
  return User.findById(userId)
    .populate("tags")
    .then(res => res.tags);
};
UserSchema.statics.findLists = userId => {
  const User = mongoose.model("users");
  return User.findById(userId)
    .populate("lists")
    .then(res => res.lists);
};

UserSchema.statics.updateList = async (listId, userId) => {
  const List = mongoose.model("lists");
  const User = mongoose.model("users");

  User.findById(userId).then(user => {
    user.lists.push(listId);
    user.save();
  });
};

UserSchema.statics.updateTag = async (tagId, userId) => {
  const List = mongoose.model("lists");
  const User = mongoose.model("users");

  User.findById(userId).then(user => {
    user.tags.push(tagId);
    user.save();
  });
};
module.exports = mongoose.model("users", UserSchema);
