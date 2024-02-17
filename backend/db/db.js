const mongoose = require("mongoose");
const { boolean } = require("zod");

mongoose.connect(
  "mongodb+srv://admin:1234567890@cluster0.kr1umr2.mongodb.net/taskflow"
);

const userScehma = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const taskSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  desc: { required: true, type: String },
  endTime: { type: Date, required: true },
  done: { type: Boolean, default: false },
  doubleCheck: { type: Boolean, default: false },
});

const user = mongoose.model("user", userScehma);
const task = mongoose.model("task", taskSchema);

module.exports = {
  user,
  task,
};
