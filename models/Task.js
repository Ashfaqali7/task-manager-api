const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['pending', 'done'],
        default: "pending"
    },
    dueDate: Date

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);