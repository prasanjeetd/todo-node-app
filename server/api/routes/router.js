const validateToken = require('../utils').validateToken;

module.exports = (app) => {
    const task = require('../controllers/task.controller');

    app.use('/api/v1/task', validateToken);

    // Create a new task
    app.post('/api/v1/task', task.create);

    // Retrieve all tasks
    app.get('/api/v1/task', task.findAll);

    // Retrieve a single task with taskId
    app.get('/api/v1/task/:taskId', task.findOne);

    // Update a task with taskId
    app.put('/api/v1/task/:taskId', task.update);

    // Delete a task with taskId
    app.delete('/api/v1/task/:taskId', task.delete);

};