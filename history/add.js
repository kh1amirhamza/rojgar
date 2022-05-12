const History = require('../models/history')

module.exports = {
     addHistory(id){
        const history = new History({
            _id: id,
            data: []
        });

        history.save().then((result)=>{
            console.log("Uploading History to MongoDB has successful.");
            console.log(result);
            //res.json(result);
            //res.end();
        }).catch((error)=>{
            console.log("Uploading History to MongoDB has Failed: error: " + error);
            ///res.json({ message: "History add Failed" });
            //res.end();
        })
  }
}
