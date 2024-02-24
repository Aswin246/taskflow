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
    return res.status(400).json({
      msg: "Invalid auth token format",
    });
  }

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT);
    if (!decoded) {
      return res.status(400).json({
        msg: "Invalid auth token",
      });
    }
    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({
      msg: "Invalid auth token",
    });
  }
};

module.exports = authMiddleware;
