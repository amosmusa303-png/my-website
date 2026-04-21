const mongoose = require("mongoose");

//flexible
const userSchema = new mongoose.Schema({ 
  name: {type: String}   ,
  age: {type: Number},
  email: { type: String, unique: true },
  password: {type: String},
  role: { type: String, default: "user", enum: ["user", "admin"] },
});

//create model
const User = mongoose.model("user", userSchema);

module.exports = User;
