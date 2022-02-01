const jwt = require("jsonwebtoken");

const {User} = require('../models')
const config = require("../config/config");

const verifyToken = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {

        const tokenContent = jwt.verify(token, config.authentication.jwtSecret);

        const user = await User.findOne({
            where: {
                id: tokenContent.user
            }
        });

        if (!user) {
          throw new Error("User not found");
        }

        req.user = user;

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;