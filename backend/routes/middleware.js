const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWT = require("../config");

app.use(express.json());
app.use(cors());

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer")) {
    res.json(400).json({
      msg: "Invalid auth token format",
    });
    return;
  }
  const token = auth.split(" ")[1];
  const decoded = jwt.verify(token, JWT);
  console.log(decoded);
  if (!decoded) {
    res.json(400).json({
      msg: "Invalid auth token",
    });
  }
  req.id = decoded.id;
  next();
};

module.exports = authMiddleware;
