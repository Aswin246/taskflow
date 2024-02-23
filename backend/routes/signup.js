const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const token = require("../config");
const router = express.Router();
const { user } = require("../db/db");
const bcrypt = require("bcrypt");

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const app = express();
app.use(cors());
app.use(express.json());

router.post("/", async (req, res) => {
  const body = req.body;
  const success = signupSchema.safeParse(body);

  if (!success.success) {
    res.status(400).json({
      msg: "Invalid inputs",
    });
    return;
  }

  const userExist = await user.findOne({
    username: body.username,
  });

  if (userExist) {
    res.status(400).json({
      msg: "User already exists",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const createUser = await user.create({
    username: body.username,
    password: hashedPassword,
    firstName: body.firstName,
    lastName: body.lastName,
  });

  if (createUser) {
    const id = createUser._id;

    const authKey = jwt.sign({ id }, token);

    res.status(200).json({
      msg: "User created successfully",
      token: authKey,
    });
  }
});

module.exports = router;
