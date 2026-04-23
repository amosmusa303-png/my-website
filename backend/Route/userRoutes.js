const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  loginUser,
  getUserbyId,
  deleteUser,
  deleteUserById,
} = require("../Controller/userController");
const { authenticateToken, isAdmin } = require("../middleware/authenticate");
//const { model } = require("mongoose");
const router = express.Router();

router.post("/create", createUser);
router.get("/all-users", authenticateToken, getUsers);
router.put("/update/:id", authenticateToken, updateUser);
router.get("/:id", authenticateToken, getUserbyId);
router.delete("/delete-user", authenticateToken, deleteUser);
router.delete("/:id", authenticateToken, deleteUserById);
router.post("/login", loginUser);

module.exports = router;
