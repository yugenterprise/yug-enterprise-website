const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const fs = require("fs");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");


const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* MULTER STORAGE */

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "yug-products",
    allowed_formats: ["jpg","png","jpeg","webp"]
  }
});

const upload = multer({ storage });

/* ADD PRODUCT */
router.post("/products", authMiddleware, upload.single("image"), async (req,res)=>{

  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    image: req.file.path
  });

  await product.save();

  res.json({success:true});
});

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

    const product = await Product.findById(req.params.id);

    if(product && product.image){

      const publicId = product.image.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy("yug-products/" + publicId);

    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ success: true });

  }
);

module.exports = router;