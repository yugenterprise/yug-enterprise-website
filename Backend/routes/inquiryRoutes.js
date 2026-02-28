const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");
const authMiddleware = require("../middleware/authMiddleware");

/* ADD INQUIRY (PUBLIC) */
router.post("/inquiries", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const inquiry = new Inquiry({ name, email, message });
    await inquiry.save();

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed" });
  }
});

/* GET ALL (ADMIN) */
router.get("/inquiries", authMiddleware, async (req, res) => {
  const data = await Inquiry.find().sort({ createdAt: -1 });
  res.json(data);
});

/* DELETE */
router.delete("/inquiries/:id", authMiddleware, async (req, res) => {
  await Inquiry.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;