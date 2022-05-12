const Video = require('../models/video')

module.exports = {
    addVideo(req, res){
       var vData = req.body;
       const id = "V" + Date.now();

    //    let current = new Date();
    //    let vData = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    //    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    //    let dateTime = cDate + ' ' + cTime;

       const video = new Video({
           _id: id,
           data: {
               title: vData.title,
               url: vData.url,
               current_view: vData.current_view,
               required_view: vData.required_view
           }
       });

       video.save().then((result)=>{
           console.log("Uploading Video to MongoDB has successful.");
           console.log(result);
           res.json(result);
           res.end();
       }).catch((error)=>{
           console.log("Uploading Video to MongoDB has Failed: error: " + error);
           res.json({ message: "Video add Failed" });
           res.end();
       })
 }
}

