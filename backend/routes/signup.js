const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const token = require("../config");
const router = express.Router();
const user = require("../db/db");

const signupSchema = zod.object({
  username: zod.username,
  password: zod.string,
  firstName: zod.string,
  lastName: zod.string,
});

const app = express();
app.use(cors);
app.use(express.json());

router.post("/", async (req, res) => {
  const body = req.body;
  const success = signupSchema.safeParse(body);

  if (!success) {
    res.status(200).json({
      msg: "Invalid inputs",
    });
    return;
  }

  const createUser = await user.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastname: body.lastName,
  });

  if (createUser) {
    const id = createUser._id;

    const authKey = jwt.sign(id, token);

    res.status(400).json({
      msg: "User created successfully",
      token: authKey,
    });
  }
});

module.exports = {
  router,
};
