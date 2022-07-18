const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    defaul: Date.now(),
  },
});

module.exports = mongoose.model("TodoTask", taskSchema, "tasks");
