const News = require('../models/news')

module.exports = {
     getNews(id, req, res){
         
        var searchQuery ={}
        
        if (id) {
            searchQuery = {"_id" : id}
            findNews(req, res, searchQuery)
        }else{
            res.json({"message": "invalid  query"});
            res.end();
        }
  },
  getRecentNews(req, res){
    var searchQuery ={}
    const { title, limit =20 , page =1} = req.query;
    
    if (title) {
        searchQuery = { 'data.title' : { '$regex' : title, '$options' : 'i' } }
        findRecentNews(res, res, searchQuery, limit, page);
    }else{
        findRecentNews(res, res, searchQuery, limit, page);
    }
  }
}

function findNews(req, res, searchQuery){

    News.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            if (result==null) {
                res.json({"message": "News not found."});
                res.end();
            }else{
                res.json(result);
                res.end();
            }
        }
    });
}

function findRecentNews(req, res, searchQuery, limit, page){
    News.find(searchQuery)
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
