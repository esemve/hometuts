const Joi = require('joi');

const register = (req, res, next) => {

    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(4).required()
    });

    const validation = schema.validate(req.body);

    const error = validation.error;

    if (error) {
        switch (error.details[0].context.key) {
            case 'username':
                    res.status(400).send({
                        error: 'You must provide a min 3 characters length user name!'
                    });
                break;

            case 'password':
                    res.status(400).send({
                        error: 'You must provide a min 4 characters length password!'
                    });
                break;

            default:
                res.status(400).send({
                    error: 'Invalid registration information'
                });
        }

        return;
    }

    return next()
};


module.exports = register;