const express = require("express");
const app = express();
const signinRouter = require("./signin");
const signupRouter = require("./signup");
const router = express.Router();
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);

module.exports = router;
