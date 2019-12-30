const mongoose = require('mongoose');
const User = require('../models/users.model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


module.exports = {

    add: (req, res) => {

        let result = {};
        let status = 201;

        const { name, password } = req.body;
        const user = new User({ name, password }); // document = instance of a model

        user.save((err, user) => {
            if (!err) {
                result.status = status;
                result.result = user;
            } else {
                status = 500;
                result.status = status;
                result.error = err;
            }
            res.status(status).send(result);
        });

    },

    login: (req, res) => {
        const { name, password } = req.body;

        let result = {};
        let status = 200;

        User.findOne({ name }, (err, user) => {
            if (!err && user) {
                // We could compare passwords in our model instead of below as well
                bcrypt.compare(password, user.password).then(match => {
                    if (match) {
                        status = 200;

                        console.log("env:",process.env.JWT_SECRET);

                        // Create a token
                        const payload = { user: user.name };
                        const options = { expiresIn: 120, issuer: 'http://localhost:3000' };
                        const secret = process.env.JWT_SECRET;
                        const token = jwt.sign(payload, secret, options);

                        console.log('TOKEN', token);
                        result.token = token;
                        result.status = status;
                        
                    } else {
                        status = 401;
                        result.status = status;
                        result.error = `Authentication error`;
                    }
                    res.status(status).send(result);
                }).catch(err => {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                });
            } else {
                status = 404;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });



    }
};
