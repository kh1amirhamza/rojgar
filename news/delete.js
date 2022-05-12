const News = require('../models/news')

module.exports = {
     deleteNews(id, req, res){
    const query = { "_id": id } ;
      News.deleteOne(query, (error, result)=>{
          if (error) {
              console.log(error);
              res.end();
          }else{
              res.json({"message": id+" news is Deleted!"})
              res.end();
          }
      })
  }
}