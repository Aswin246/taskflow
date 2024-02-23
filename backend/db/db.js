const mongoose = require("mongoose");
require("dotenv").config();
const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl);

const userScehma = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const taskSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  desc: { required: true, type: String },
  endDate: { type: Date, required: true },
  endHour: { type: Number, required: true },
  endMinute: { type: Number, required: true },
  done: { type: Boolean, default: false },
  doubleCheck: { type: Boolean, default: false },
});

const user = mongoose.model("user", userScehma);
const task = mongoose.model("task", taskSchema);

module.exports = {
  user,
  task,
};
