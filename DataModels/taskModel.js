import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    moduleCode:{
        type: String,
        required: required
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority:{
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});
const Task = mongoose.model("Tasks", taskSchema);
export default Task;