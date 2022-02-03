const VideoStorage = require('../storages/VideoStorage');

module.exports = {

     async index (req, res) {
         try {
             res.send({
                 tags: VideoStorage.getTags()
             });
         } catch (err) {
             res.status(500).send({
                 error: 'Error!'
             })
         }
    },
};