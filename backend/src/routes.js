const AuthenticationController = require('./controllers/AuthController');
const TagsController = require('./controllers/TagsController');
const TutorialsController = require('./controllers/TutorialsController');
const VideosController = require('./controllers/VideosController');
const VideoStreamController = require('./controllers/VideoStreamController');
const UsersController = require('./controllers/UsersController');

const Auth = require("./middleware/Auth");
const AdminRole = require("./middleware/AdminRole");


module.exports = (app) => {

    app.get('/healthcheck', (req, res) => {
        res.send({
            message: 'ok'
        })
    });

    app.post(
        '/password-change',
        Auth,
        AuthenticationController.passwordChange
    );

    app.post(
        '/login',
        AuthenticationController.login
    );

    app.post('/users/create',
      Auth,
      AdminRole,
      UsersController.create
    );

    app.get('/users/:id/add_addmin_role',
      Auth,
      AdminRole,
      UsersController.addAdminRole
    );

    app.get('/users/:id/remove_admin_role',
      Auth,
      AdminRole,
      UsersController.removeAdminRole
    );

    app.delete('/users/:id',
      Auth,
      AdminRole,
      UsersController.delete
    );

    app.get('/users',
      Auth,
      AdminRole,
      UsersController.index
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
