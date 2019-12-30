module.exports = {

    saveResponse(task) {
        return {
            code: 200, status: "success",
            data: {
                id: task._id,
                title: task.title,
                content: task.content,
                completed: task.completed
            }
        };
    },

    getAllResponse(data) {

        const tasks = data.map(t => {
            return {
                id: t._id,
                title: t.title,
                content: t.content,
                completed: t.completed
            };
        });

        return { code: 200, status: "success", data: tasks };
    },

    getResponse(task) {
        return {
            code: 200,
            status: "success",
            data: {
                id: task._id,
                title: task.title,
                content: task.content,
                completed: task.completed
            }
        };
    },

    errorResponse(err) {

        return { code: 500, status: "fail", messsage: err };
    },

    validationResponse(err) {

        return { code: 400, status: "fail", messsage: err };
    },

    deleteResponse(msg) {
        return {
            code: 200,
            status: "success",
            message: msg
        };
    }


};
