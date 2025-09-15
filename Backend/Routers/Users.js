const express = require('express');
const { Users } = require('../Models/User');
const { Signup } = require('../Controllers/Auth');
const { authMiddleware } = require('../Middleware/authMiddleware');
const UsersRouter = express.Router();

// ✅ Get all users (admin purpose)
UsersRouter.get("/", authMiddleware(['admin']), async (req, res) => {
  try {
    const users = await Users.find().sort({ created_at: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});



// ✅ Add new user
UsersRouter.post("/", Signup);

// ✅ Update user by ID
UsersRouter.put("/:id", async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error: error.message });
  }
});

// ✅ Delete user by ID
UsersRouter.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});


module.exports = { UsersRouter };
