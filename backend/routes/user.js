const express = require("express");
const authMiddleware = require("./middleware");
const cors = require("cors");
const { user } = require("../db/db");
const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

router.get("/currentDateTime", authMiddleware, (req, res) => {
  const currentDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  res.json({
    date: currentDate,
  });
});
router.get("/firstName", authMiddleware, async (req, res) => {
  const userId = req.id;
  try {
    const currentUser = await user.findById(userId);

    if (!currentUser) {
      res.status(200).json({
        msg: "User doesn't exists",
      });
    }

    const firstName = currentUser.firstName;

    res.status(200).json({
      msg: "Name fetched successfully",
      firstName,
    });
  } catch (error) {
    res.status(200).json({
      msg: "Internal server error",
    });
  }
});

module.exports = router;
