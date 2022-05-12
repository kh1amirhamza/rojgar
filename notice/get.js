const Notice = require('../models/notice')

module.exports = {
     getNotice(id, req, res){
         
        var searchQuery ={}
        
        if (id) {
            searchQuery = {"_id" : id}
            findNotice(req, res, searchQuery)
        }else{
            res.json({"message": "invalid  query"});
            res.end();
        }
  },
  getRecentNotice(req, res){
    var searchQuery ={}
    const { title, limit =20 , page =1} = req.query;
    
    if (title) {
        searchQuery = { 'data.title' : { '$regex' : title, '$options' : 'i' } }
        findRecentNotice(res, res, searchQuery, limit, page);
    }else{
        findRecentNotice(res, res, searchQuery, limit, page);
    }
  }
}

function findNotice(req, res, searchQuery){

    Notice.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            if (result==null) {
                res.json({"message": "Notice not found."});
                res.end();
            }else{
                res.json(result);
                res.end();
            }
        }
    });
}

function findRecentNotice(req, res, searchQuery, limit, page){
    Notice.find(searchQuery)
    .sort({updatedAt:-1})
    .limit(parseInt(limit)).skip(((page-1)*limit))
    .then((result)=>{
        res.json(result);
        res.end();
    })
    .catch((error)=>{
        console.log(error);
        res.end()
    });
}
