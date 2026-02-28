const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

/* MULTER STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ADD PRODUCT */
router.post(
  "/products",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ error: "Form data missing" });
      }

      const name = req.body.name;
      const category = req.body.category;
      const description = req.body.description;

      if (!req.file) {
        return res.status(400).json({ error: "Image not uploaded" });
      }

      const product = new Product({
        name,
        category,
        description,
        image: req.file.filename,
      });

      await product.save();

      res.json({ success: true });

    } catch (err) {
      console.log("PRODUCT ERROR:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

/* GET PRODUCTS */
router.get("/products", async (req, res) => {
  const data = await Product.find().sort({ createdAt: -1 });
  res.json(data);
});

/* DELETE PRODUCT */
router.delete(
  "/products/:id",
  authMiddleware,
  async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  }
);

module.exports = router;