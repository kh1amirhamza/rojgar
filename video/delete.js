const Video = require('../models/video')

module.exports = {
     deleteVideo(id, req, res){
    const query = { "_id": id } ;
      Video.deleteOne(query, (error, result)=>{
          if (error) {
              console.log(error);
              res.end();
          }else{
              res.json({"message": id+" video is Deleted!"})
              res.end();
          }
      })
  }
}