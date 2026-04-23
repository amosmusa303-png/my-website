const User = require("../MODELS/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Basic
//Create
const createUser = async (req, res) => {
  try {
    const { name, age, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, age, name, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "User registered succesfully" });
  } catch (err) {
    res.send(err.message);
  }
};
//   const user = await User.create(req.body);
//   res.status(200).json({ message: "User added successfully", user });
// } catch (err) {
//   res.status(500).json({ message: "An error occured", err });

//login
const loginUser = async (req, res) => {
  console.log("ran login");
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id, userEmail: user.email, userRole: user.userRole },
    process.env.JWT_KEY,
    { expiresIn: "50m" },
  );
  res.json(token);
};

// const userEmail = reg.body.email;
// const userPassword = req.body.password;
// const user = await User.findOne({ email: userEmail, password: userPassword });
// res.json(user);

//Read
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "A err occured while getting users" });
    console.log("the error:", err);
  }
};

// const getUserbyId = async (req, res) => {
//   const { id } = req.params;

//   const user = await User.findById(id);
//   res.status(200).json(user);
// };

const getUserbyId = async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete
const deleteUser = async (req, res) => {
  const { id } = req.body;
  console.log("user id", id);

  await User.findByIdAndDelete(id);
  res.status(200).json("User deleted successfully");
};
//deleteUserById
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);
  res.status(200).json("User deleted succesfully");
};

//update
// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate(id, req.body, { new: true });
//     res.json("User update successfully", user);
//   } catch (err) {
//     res.json(err.message);
//   }
// };

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// //login
// const loginUser = async (req, res) => {
//   console.log("ran login");
//   const userEmail = req.body.email;
//   const userPassword = req.body.password;
// };

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  deleteUserById,
  getUserbyId,
};
