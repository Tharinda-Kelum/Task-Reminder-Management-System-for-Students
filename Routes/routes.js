import express from "express";
import { register, login } from "../Controllers/authController.js";
import { getTasks, createTask, updateTask, deleteTask } from "../Controllers/taskController.js";
import { protect } from "../Middleware/auth.js";

const router = express.Router();

// Auth routes
router.post("/auth/register", register);
router.post("/auth/login", login);

// Task routes
router.get("/tasks", protect, getTasks);
router.post("/tasks", protect, createTask);
router.put("/tasks/:id", protect, updateTask);
router.delete("/tasks/:id", protect, deleteTask);

export default router;