require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const authRoutes = require("./routes/authRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

/* ---------- CREATE UPLOAD FOLDER (IMPORTANT FOR RENDER) ---------- */

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* ---------- MIDDLEWARE ---------- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- STATIC FOLDERS ---------- */

// Serve uploaded images
app.use("/uploads", express.static(uploadPath));

// Frontend public website
app.use(express.static(path.join(__dirname, "../Frontend")));

// Admin panel
app.use("/admin", express.static(path.join(__dirname, "../admin")));

/* ---------- API ROUTES ---------- */

app.use("/api", authRoutes);
app.use("/api", inquiryRoutes);
app.use("/api", productRoutes);

/* ---------- DEFAULT ROUTE ---------- */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

/* ---------- DATABASE ---------- */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

/* ---------- SERVER ---------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});