const mongoose = require("mongoose");
const Admin = require("./models/Admin");

mongoose.connect("mongodb://127.0.0.1:27017/yug_enterprise")
.then(async () => {
  await Admin.deleteMany(); // ⚠ remove old admins

  await Admin.create({
    username: "admin",
    password: "admin123"
  });

  console.log("✅ Admin created");
  process.exit();
});
 