const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// 🔐 Protect all routes
router.use(authMiddleware);

// ===================== GET TASKS =====================
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== ADD TASK =====================
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    // ✅ Validation
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title,
      userId: req.user.id
    });

    await task.save();
    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/mark-all", async (req, res) => {
  try {
    console.log("USER:", req.user);   // 👈 ADD THIS

    await Task.updateMany(
      { userId: req.user.id },
      { completed: true }
    );

    res.json({ message: "All tasks completed" });

  } catch (err) {
    console.log("ERROR:", err);  // 👈 ADD THIS
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== UPDATE TASK =====================
router.put("/:id", async (req, res) => {
  try {
    const { completed, title } = req.body;
    const updated = await Task.findOneAndUpdate(
  { _id: req.params.id, userId: req.user.id },
  { completed, title },
  { new: true }
);

    // ✅ Handle not found
    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== DELETE TASK =====================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    // ✅ Handle not found
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;