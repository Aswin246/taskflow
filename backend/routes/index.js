const express = require("express");
const signinRouter = require("./signin");
const signupRouter = require("./signup");
const userRouter = require("./user");
const taskRouter = require("./task");
const router = express.Router();
router.use("/signin", signinRouter);
router.use("/signup", signupRouter);
router.use("/task", taskRouter);
router.use("/user", userRouter);

module.exports = router;
