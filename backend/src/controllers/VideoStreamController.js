const querystring = require('querystring');
const VideoStorage = require('../storages/VideoStorage');
const fs = require("fs");
var mime = require('mime');


module.exports = {

  async index (req, res) {
    const qs = querystring.parse(req.url)

    try {
      const range = req.headers.range;
      if (!range || typeof qs.tag === 'undefined' || typeof qs.video === 'undefined'|| typeof qs.tutorial === 'undefined') {
        res.status(400).send("Invalid request!");
        return
      }
      let videoPath = `./../videos/${qs.tag}/${qs.tutorial}/`
      if (typeof qs.group !== 'undefined') {
        videoPath = videoPath + qs.group + "/"
      }
      videoPath = videoPath + qs.video
      if (!range || typeof qs.tag === 'undefined' || typeof qs.video === 'undefined'|| typeof qs.tutorial === 'undefined') {
        res.status(400).send("Invalid request!");
        return
      }
      const videoMime = mime.getType(videoPath)

      const videoSize = fs.statSync(videoPath).size;
      const CHUNK_SIZE = 10 ** 6;
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": videoMime,
      };
      res.writeHead(206, headers);
      const videoStream = fs.createReadStream(videoPath, { start, end });
      videoStream.pipe(res);

    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Error!'
      })
    }
  },
};