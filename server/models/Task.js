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

module.exports = mongoose.model("tasks", TaskSchema);

// id: 0,
//     task_id: 1,
//         author_id: 0,
//             body: 'string',
//                 due_date: 'string',
//                     start_date: 'string',
//                         priority: 'string',
//                             repeat: 'string',
//                                 location: 'string',
//                                     tag: 'string',
//                                         list_id: 'integer'
