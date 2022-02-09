const AuthenticationController = require('./controllers/AuthController');
const TagsController = require('./controllers/TagsController');
const TutorialsController = require('./controllers/TutorialsController');
const VideosController = require('./controllers/VideosController');
const VideoStreamController = require('./controllers/VideoStreamController');

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

    app.get('/videos/:tag/:tutorial',
      Auth,
      VideosController.index
    );

    app.get('/videostream',
      VideoStreamController.index
    );

    app.get('/checklogin', Auth, (req, res) => {
        res.send({
            message: 'ok'
        })
    });
};
