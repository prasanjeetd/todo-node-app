const Task = require('../models/task.model');

module.exports = {

    add(data) {

        return new Promise((resolve, reject) => {

            // Create a Task
            const task = new Task({
                title: data.title || "Untitled Task",
                content: data.content,
                completed: false
            });

            // Save Task in the database
            task.save()
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });

        });

    },

    getAll() {

        return Task.find();
    },

    get(taskId) {
        return Task.findById(taskId);
    },

    update(task) {

        // Find task and update it with the request body
        return Task.findByIdAndUpdate(task.id, {
            title: task.title || "Untitled Task",
            content: task.content,
            completed: task.completed,
        }, { new: true });
    },

    delete(taskId) {

        return Task.findByIdAndRemove(taskId);
    }


};
