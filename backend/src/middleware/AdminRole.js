const adminRole = async (req, res, next) => {

    if (!req.user) {
        return res.status(403).send("Please log in!");
    }

    if (req.user.isAdmin === false) {
        return res.status(403).send("You are not an admin!");
    }

    return next();
};

module.exports = adminRole;