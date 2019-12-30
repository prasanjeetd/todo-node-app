const users = require('../controllers/users.controller');

module.exports = (router) => {

    router.route('/users')
        .post(users.add);

    router.route('/login')
        .post(users.login);

    return router;
    
};