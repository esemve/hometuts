const AuthenticationController = require('./controllers/AuthController');
const TagsController = require('./controllers/TagsController');
const TutorialsController = require('./controllers/TutorialsController');

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

    app.get('/tags',
        Auth,
        TagsController.index
    );

    app.get('/tags/:tag',
        Auth,
        TutorialsController.index
    );

    app.get('/checklogin', Auth, (req, res) => {
        res.send({
            message: 'ok'
        })
    });
};
