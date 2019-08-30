const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
   
});

module.exports = mongoose.model("tasks", TaskSchema);