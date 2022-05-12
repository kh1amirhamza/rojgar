const Withdraw = require('../models/witdraw');

module.exports = {
    addWithdraw(id){
        const withdraw = new Withdraw({
            _id: id,
            data: []
        });

        withdraw.save().then((result)=>{
            console.log("Uploading Withdraw to MongoDB has successful.");
            console.log(result);
            //res.json(result);
            //res.end();
        }).catch((error)=>{
            console.log("Uploading Withdraw to MongoDB has Failed: error: " + error);
            ///res.json({ message: "Withdraw add Failed" });
            //res.end();
        })
  }
}
