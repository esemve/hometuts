const {User} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const crypto =  require('crypto');

function jwtSignuser(user) {
    const ONE_WEEK = 60*60*24*7;
    return jwt.sign({
        user: user.id,
        hash: crypto.createHash("sha256").update(user.password).digest('hex')
    }, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

function createResponseObject (user) {
    const userJson = user.toJSON();
    return {
        username: userJson.username,
        id: userJson.id,
        isAdmin: user.isAdmin,
        token: jwtSignuser(userJson)
    }
}


module.exports = {
    async passwordChange (req, res) {
        try {
            const user = req.user
            const {password} = req.body;

            if (password === '') {
                throw new Error();
            }

            user.password = password
            user.save()

            const reloadedUser = await User.findOne({
                where: {
                    id: user.id
                }
            });

            res.send(createResponseObject(reloadedUser))

        } catch (err) {
            res.status(400).send({
                error: 'Invalid password changing!'
            })
        }
    },

    async login (req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({
              where: {
                username: username
              }  
            });

            if (!user) {
                res.status(403).send({
                    error: 'Unknown user/password!'
                });
                return;
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                res.status(403).send({
                    error: 'Unknown user/password!'
                });
                return;
            }
            
            res.send(createResponseObject(user))

        } catch (err) {

            res.status(400).send({
                error: 'Unknown user/password!'
            })
        } 
    }
};