const express = require("express");
const zod = require("zod");
const { task } = require("../db/db");
const authMiddleware = require("./middleware");
const cors = require("cors");
const moment = require("moment-timezone");
const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

const taskSchema = zod.object({
  desc: zod.string(),
});

router.post("/add", authMiddleware, async (req, res) => {
  const body = req.body;
  const success = taskSchema.safeParse(body);

  if (!success.success) {
    console.log(success.error);
    res.status(400).json({
      msg: "Invalid inputs",
    });
    return;
  }

  const desc = body.desc;
  const endDate = body.endDate;
  const endHour = body.endHour;
  const endMinute = body.endMinute;
  const findTask = await task.findOne({
    desc: desc,
  });

  if (findTask) {
    res.status(400).json({
      msg: "Task already exists",
    });
    return;
  }

  await task.create({
    desc: desc,
    endDate: endDate,
    endHour: endHour,
    endMinute: endMinute,
  });
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
