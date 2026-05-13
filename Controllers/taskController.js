import Task  from "../DataModels/taskModel.js";

export const createTask = async (req, res) => {
    try {
        const taskData = new Task(req.body);
        const savedTask = await taskData.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};