import Task  from "../DataModels/taskModel.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
};

export const createTask = async (req, res) => {
    const newTask = new Task({ ...req.body, userId: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
    );
    res.json(task);
};

export const deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Task deleted" });
};