const AuthenticationController = require('./controllers/AuthController')

const Registration = require('./middleware/Registration');
const Auth = require("./middleware/Auth");


module.exports = (app) => {

    app.get('/healthcheck', (req, res) => {
        res.send({
            message: 'ok'
        })
    });

    app.post(
        '/register',
        Registration,
        AuthenticationController.register
    );

    app.post(
        '/login',
        AuthenticationController.login
    );

    app.get('/checklogin', Auth, (req, res) => {
        console.log(req.user);
        res.send({
            message: 'ok'
        })
    });
};
