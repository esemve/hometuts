const VideoStorage = require('../storages/VideoStorage');

module.exports = {

     async index (req, res) {
         try {

             const tutorials = VideoStorage.getTutorials(req.params.tag);

             if (tutorials === null) {
                 res.status(404).send({
                     error: 'Tag not found!'
                 });
                 return;
             }

             res.send({
                 tutorials: tutorials
             });
         } catch (err) {
             res.status(500).send({
                 error: 'Error!'
             })
         }
    },
};