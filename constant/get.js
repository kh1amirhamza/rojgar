const Constant = require('../models/constant')

module.exports = {
     getConstant(req, res){
        var searchQuery ={"_id": "Constant"}
        findConstant( req, res, searchQuery );
  }
}

function findConstant(req, res, searchQuery){

    Constant.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            res.json(result);
            res.end();
        }
    });
}
