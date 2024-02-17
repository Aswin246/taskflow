const express = require("express");
const signinRouter = require("./signin");
const signupRouter = require("./signup");
const taskRouter = require("./task");
const router = express.Router();
router.use("/signin", signinRouter);
router.use("/signup", signupRouter);
router.use("/task", taskRouter);

module.exports = router;
