const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: String,
    content: String,
    completed: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);