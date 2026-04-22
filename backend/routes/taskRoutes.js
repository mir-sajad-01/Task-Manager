const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// Protect all routes
router.use(authMiddleware);

// ✅ Get only logged-in user's tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// ✅ Add task with userId
router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    userId: req.user.id
  });

  await task.save();
  res.json(task);
});

// ✅ Update task (only if it belongs to user)
router.put("/:id", async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );

  res.json(updated);
});

// ✅ Delete task (only if it belongs to user)
router.delete("/:id", async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  res.json({ message: "Deleted" });
});

module.exports = router;