const Notice = require('../models/notice')

module.exports = {
     deleteNotice(id, req, res){
    const query = { "_id": id } ;
      Notice.deleteOne(query, (error, result)=>{
          if (error) {
              console.log(error);
              res.end();
          }else{
              res.json({"message": id+" notice is Deleted!"})
              res.end();
          }
      })
  }
}