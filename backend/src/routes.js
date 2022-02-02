const AuthenticationController = require('./controllers/AuthController');
const LessionController = require('./controllers/LessionController');

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

    app.get('/lessions',
        Auth,
        LessionController.index
    );

    app.get('/checklogin', Auth, (req, res) => {
        res.send({
            message: 'ok'
        })
    });
};
