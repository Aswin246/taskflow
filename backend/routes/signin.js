const express = require("express");
const zod = require("zod");
const cors = require("cors");
const router = express.Router();
const { user } = require("../db/db");
const jwt = require("jsonwebtoken");
const JWT = require("../config");
const authMiddleware = require("./middleware");

const app = express();
app.use(cors());
app.use(express.json());

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/", async (req, res) => {
  const body = req.body;
  const success = signInSchema.safeParse(body);

  if (!success.success) {
    res.status(400).json({
      msg: "Invalis inputs",
    });
    return;
  }

  const username = body.username;
  const password = body.password;
  const findUser = await user.findOne({
    username,
  });
  if (!findUser) {
    res.status(400).json({
      msg: "User doesn't exists",
    });
    return;
  }
  const verifyPassword = await user.findOne({
    username: username,
    password: password,
  });
  if (!verifyPassword) {
    res.status(200).json({
      msg: "Incorrect password",
    });
    return;
  }
  const id = findUser._id;
  const token = jwt.sign({ id }, JWT);

  res.status(200).json({
    msg: "Sign in successfull",
    token: token,
  });
});

module.exports = router;
