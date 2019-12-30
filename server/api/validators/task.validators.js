module.exports.post =(data) => {

    // require the Joi module
    const Joi = require('joi');

    // fetch the request data

    // define the validation schema
    const schema = Joi.object().keys({

        // email is required
        // email must be a valid email string
        title: Joi.string().required().min(2).max(20),

        // phone is required
        // and must be a string of the format XXX-XXX-XXXX
        // where X is a digit (0-9)
        content: Joi.string()
                .max(50)
                .required(),

        completed: Joi.boolean()

    });

    
    return schema.validate(data);
    
};
