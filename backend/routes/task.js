const express = require("express");
const zod = require("zod");
const { task, user } = require("../db/db");
const authMiddleware = require("./middleware");
const cors = require("cors");
const moment = require("moment-timezone");
const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.id;
    const body = req.body;
    const desc = body.desc;
    const endDate = body.endDate;
    const endHour = body.endHour;
    const endMinute = body.endMinute;

    const existingTask = await task.findOne({ desc: desc });
    if (existingTask) {
      return res.status(400).json({
        msg: "Task already exists",
      });
    }

    await task.create({
      id: userId,
      desc: desc,
      endDate: endDate,
      endHour: endHour,
      endMinute: endMinute,
    });

    return res.status(201).json({
      msg: "Task added successfully",
    });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
});

router.post("/done", authMiddleware, async (req, res) => {
  const taskId = req.body.taskId;

  const findTask = await task.findById(taskId);
  if (!findTask) {
    res.status(400).json({
      msg: "task doesn't exsits",
    });
    return;
  }

  findTask.done = true;
  await findTask.save();

  return res.status(200).json({ msg: "Task marked as done successfully" });
});

router.post("/doublecheck", authMiddleware, async (req, res) => {
  const taskId = req.body.taskId;
  try {
    const findTask = await task.findById(taskId);
    if (!findTask) {
      res.status(400).json({
        msg: "task doesn't exsits",
      });
      return;
    }

    if (findTask.done == false) {
      res.status(400).json({
        msg: "Intial mark as done failed",
      });
      return;
    }

    findTask.doubleCheck = true;
    const doubleCheckDone = await findTask.save();
    if (doubleCheckDone) {
      return res.status(200).json({ msg: "Task marked as done successfully" });
    } else {
      return res.status(400).json({ msg: "Double-check failed" });
    }
  } catch (error) {
    console.error("Error double-checking task:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/update", authMiddleware, async (req, res) => {
  const body = req.body;
  const success = taskSchema.safeParse(body);

  if (!success.success) {
    console.log(success.error);
    res.status(400).json({
      msg: "Invalid inputs",
    });
    return;
  }
  try {
    const taskId = body.taskId;

    await task.updateOne(
      {
        _id: taskId,
      },
      {
        desc: body.desc,
        endDate: body.endDate,
        endHour: body.endHour,
        endMinute: body.endMinute,
      }
    );
    res.status(200).json({
      msg: "Task updated successfully",
    });
    return;
  } catch (error) {
    res.status(200).json({
      msg: "Internal server error",
    });
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const tasks = await task.find({ id: userId });

    if (tasks.length === 0) {
      return res.status(404).json({ msg: "No tasks found for the user" });
    }

    res.status(200).json([tasks]);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/timeDifference", authMiddleware, async (req, res) => {
  const taskId = req.body.taskId;

  try {
    const currentTask = await task.findById(taskId);

    const { endDate, endHour, endMinute } = currentTask;

    const currentDate = moment().tz("Asia/Kolkata");

    if (
      moment(endDate).isBefore(currentDate) ||
      (moment(endDate).isSame(currentDate, "day") &&
        (endHour < currentDate.hours() ||
          (endHour === currentDate.hours() &&
            endMinute <= currentDate.minutes())))
    ) {
      console.log("Task end time has passed");
    } else {
      console.log("Task end time is in the future");
    }
    const dateDifference = moment(endDate).diff(currentDate, "days");
    const timeDifferenceHours = endHour - currentDate.hours();
    const timeDifferenceMinutes = endMinute - currentDate.minutes();

    res.status(200).json({
      dateDifference: dateDifference,
      timeDifferenceHours: timeDifferenceHours,
      timeDifferenceMinutes: timeDifferenceMinutes,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
