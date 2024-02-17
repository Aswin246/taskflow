const express = require("express");
const zod = require("zod");
const { user } = require("../db/db");
const { task } = require("../db/db");
const authMiddleware = require("./middleware");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

const taskSchema = zod.object({
  desc: zod.string(),
  endTime: zod.string().transform((arg) => new Date(arg)),
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
  const endTime = body.endTime;
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
    endTime: endTime,
  });
});

module.exports = router;
