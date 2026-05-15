import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { register, login } from "./Controllers/authController.js";
import { getTasks, createTask, updateTask, deleteTask } from "./Controllers/taskController.js";
import { protect } from "./Middleware/auth.js";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

app.get("/api/tasks", protect, getTasks);
app.post("/api/tasks", protect, createTask);
app.put("/api/tasks/:id", protect, updateTask);
app.delete("/api/tasks/:id", protect, deleteTask);

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
    .catch(err => console.log(err));