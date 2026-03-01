require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  await Admin.deleteMany();

  await Admin.create({
    username: "admin",
    password: "admin123"
  });

  console.log("✅ Admin created in Atlas");
  process.exit();
});