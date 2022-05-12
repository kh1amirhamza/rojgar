const Quiz = require('../models/quiz')

module.exports = {
     deleteQuiz(id, req, res){
    const query = { "_id": id } ;
      Quiz.deleteOne(query, (error, result)=>{
          if (error) {
              console.log(error);
              res.end();
          }else{
              res.json({"message": id+" quiz is Deleted!"})
              res.end();
          }
      })
  }
}