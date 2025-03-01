import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    data: {
        type: Object,
        required: true
    }
}, { timestamps: true });

export const TaskModel = mongoose.model('Task', taskSchema);