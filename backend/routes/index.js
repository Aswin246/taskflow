const express = require("express");
const signinRouter = require("./signin");
const signupRouter = require("./signup");
const router = express.Router();
router.use("/signin", signinRouter);
router.use("/signup", signupRouter);

module.exports = router;
