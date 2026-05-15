import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: false 
    },
    moduleCode: { 
        type: String, 
        required: true 
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    priority: { 
        type: String, 
        enum: ['Low', 'Medium', 'High'], 
        default: 'Medium' 
    },
    isCompleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);