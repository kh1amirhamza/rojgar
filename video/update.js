const Video = require('../models/video')

module.exports = {
    updateVideo(id, req, res) {
        const query = { "_id": id };

       const video = new Video({
           _id: id,
           data: {
               title: req.body.title,
               url: req.body.url,
               current_view: req.body.current_view,
               required_view: req.body.required_view
           }
       });

       Video.updateOne(query, {$set: video}, (err, result) => {
        if (err) {
            console.log(err);
            res.end();
        }else{
            console.log(result);
            res.json(result)
            res.end();
        }
      });
    }
}