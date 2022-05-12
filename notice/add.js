const Notice = require('../models/notice')

module.exports = {
    addNotice(req, res){
       var nData = req.body;
       const id = "NOTICE"


       const notice = new Notice({
           _id: id,
           data: {
               title: nData.title,
               image_url: nData.image_url,
               description: nData.description,
               date: nData.date
           }
       });

       notice.save().then((result)=>{
           console.log("Uploading Notice to MongoDB has successful.");
           console.log(result);
           res.json(result);
           res.end();
       }).catch((error)=>{
           console.log("Uploading Notice to MongoDB has Failed: error: " + error);
           res.json({ message: "Notice add Failed" });
           res.end();
       })
 }
}

