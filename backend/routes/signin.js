const express = require("express");
const zod = require("zod");
const cors = require("cors");
const router = express.Router();
const { user } = require("../db/db");
const jwt = require("jsonwebtoken");
const JWT = require("../config");
const authMiddleware = require("./middleware");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const success = signInSchema.safeParse(body);

    if (!success.success) {
      res.status(411).json({
        msg: "Invalis inputs",
      });
    }

    const username = body.username;
    const password = body.password;
    const findUser = await user.findOne({
      username,
    });

    if (!findUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const id = findUser._id;
    const token = jwt.sign({ id }, JWT);

    res.status(200).json({
      msg: "Sign in successfull",
      token: token,
    });
    return;
  } catch (error) {
    res.status(411).json({
      msg: "Error while logging in",
    });
  }
});

module.exports = router;
