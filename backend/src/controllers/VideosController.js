const VideoStorage = require('../storages/VideoStorage');

module.exports = {

     async index (req, res) {
         try {

             const videos = VideoStorage.getVideos(req.params.tag, req.params.tutorial);

             if (videos === null) {
                 res.status(404).send({
                     error: 'Videos not found!'
                 });
                 return;
             }

             res.send({
                 videos: videos
             });
         } catch (err) {
             console.log(err)
             res.status(500).send({
                 error: 'Error!'
             })
         }
    },
};