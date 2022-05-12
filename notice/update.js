const Notice = require('../models/notice')

module.exports = {
    updateNotice(id, req, res) {
        const query = { "_id": id };

       const notice = new Notice({
           _id: id,
           data: {
               title: req.body.title,
               image_url: req.body.image_url,
               description: req.body.description,
               date: req.body.date
           }
       });

       Notice.updateOne(query, {$set: notice}, (err, result) => {
        if (err) {
            console.log(err);
            res.end();
        }else{
            console.log(result);
            if(result.n == 1){
                res.json(result)
                res.end();
            }else{
                res.end();
            }
        }
      });
    }
}