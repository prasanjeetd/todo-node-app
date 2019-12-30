const validator = require('../validators/task.validators');
const repository = require('../db/task.service');
const taskResponse = require('../dto/response');

// Create and Save a new task
exports.create = (req, res) => {

    const data = req.body;
    const { error, value } = validator.post(data);

    // Validate request
    if (error) {
        return res.status(400).send(
            taskResponse.validationResponse(error.details[0].message)
        );
    }

    repository.add(data)
        .then(() => res.send(taskResponse.saveResponse(data))
        ).catch((err) =>
            res.status(500).send(
                taskResponse.errorResponse(err.message)
            )
        );
};

// Retrieve and return all tasks from the database.
exports.findAll = (req, res) => {

    repository.getAll()
        .then(tasks => {
            res.send(taskResponse.getAllResponse(tasks));
        }).catch((err) =>
            res.status(500).send(
                taskResponse.errorResponse(err.message)
            )
        );

};

// Find a single task with a taskId
exports.findOne = (req, res) => {

    // Validate request
    if (!req.params.taskId) {
        return res.status(400).send(
            taskResponse.validationResponse("Missing taskid")
        );
    }

    repository.get(req.params.taskId)
        .then(task => {
            if (!task) {
                return res.status(404).send(
                    taskResponse.validationResponse("task not found with id " + req.params.taskId)
                );
            }
            res.send(taskResponse.getResponse(task));

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send(
                    taskResponse.validationResponse("task not found with id " + req.params.taskId)
                );
            }
            return res.status(500).send(
                taskResponse.errorResponse("Error retrieving task with id " + req.params.taskId)
            );
        });
};
// Update a task identified by the taskId in the request
exports.update = (req, res) => {

    const data = req.body;
    const { error, value } = validator.post(data);

    // Validate request
    if (error) {
        return res.status(400).send(
            taskResponse.validationResponse(error.details[0].message)
        );
    }

    const task = {
        id: req.params.taskId,
        title: req.body.title,
        content: req.body.content,
        completed: req.body.completed,
    };

    repository.update(task)
        .then(task => {
            if (!task) {
                return res.status(404).send(
                    taskResponse.validationResponse("task not found with id " + req.params.taskId)
                );
            }
            res.send(taskResponse.saveResponse(task));
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send(
                    taskResponse.validationResponse("task not found with id " + req.params.taskId)
                );
            }
            return res.status(500).send(
                taskResponse.errorResponse("Error while updating task with id " + req.params.taskId)
            );
        });
};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {

    repository.delete(req.params.taskId)
        .then(task => {
            if (!task) {
                return res.status(404).send(
                    taskResponse.validationResponse("task not found with id " + req.params.taskId)
                );
            }
            res.send(taskResponse.deleteResponse("task deleted successfully!"));

        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send(
                    taskResponse.validationResponse("task not found with id " + req.params.taskId)
                );
            }

            return res.status(500).send(
                taskResponse.errorResponse("Could not delete task with id " + req.params.taskId)
            );
        });
};