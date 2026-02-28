const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username, password });

  if (!admin) {
    return res.json({ success: false });
  }

  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    "secretkey",
    { expiresIn: "2h" }
  );

  res.json({ success: true, token });
});

module.exports = router;