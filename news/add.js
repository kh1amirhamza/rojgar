const News = require('../models/news')

module.exports = {
    addNews(req, res){
       var nData = req.body;
       const id = "N" + Date.now();

       let current = new Date();
       let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
       let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
       let dateTime = cDate + ' ' + cTime;

       const news = new News({
           _id: id,
           data: {
               title: nData.title,
               image_url: nData.image_url,
               description: nData.description,
               owner: nData.owner,
               date: nData.date
           }
       });

       news.save().then((result)=>{
           console.log("Uploading News to MongoDB has successful.");
           console.log(result);
           res.json(result);
           res.end();
       }).catch((error)=>{
           console.log("Uploading News to MongoDB has Failed: error: " + error);
           res.json({ message: "News add Failed" });
           res.end();
       })
 }
}

