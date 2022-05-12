const Quiz = require('../models/quiz')

module.exports = {
     getQuiz(id, req, res){
        var searchQuery ={}
        if (id) {
            searchQuery = {"_id" : id}
            findQuiz(req, res, searchQuery)
        }else{
            res.json({"message": "invalid  query"});
            res.end();
        }
  },
  getAllQuizes(req, res){
      findAllQuizes(req, res);
  }
  ,
  getRandomQuiz(req, res){
      findRandomQuiz(req, res);
  }
  ,
  getFilteredQuizes(req, res){
    var searchQuery ={}
    const {limit =20 , page =1} = req.query;
    findRecentQuizes(res, res, searchQuery, limit, page);
  }
}

function findQuiz(req, res, searchQuery){

    Quiz.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
            res.end();
        }else{
            if (result==null) {
                res.json({"message": "Quiz not found."});
                res.end();
            }else{
                res.json(result);
                res.end();
            }
        }
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function findRandomQuiz(req, res, searchQuery){
    Quiz.countDocuments({}, function(error, count){
        const ramdomInt = getRandomInt(count);
        console.log(ramdomInt);
        Quiz.findOne().skip(ramdomInt).exec(function(err, result){
            if (err) {
                console.log(err);
            }else{
                if (result==null) {
                    res.json({"message": "Quiz not found."});
                    res.end();
                }else{
                    res.json(result);
                    res.end();
                }
            }
        })
    })
}


function findAllQuizes(req, res){
    let searchQuery = {};
    const {question, limit=20, page=1} = req.query;

    if (question) {
        searchQuery = { 'data.question' : { '$regex' : question, '$options' : 'i' } }
    }

    Quiz.find(searchQuery)
    .sort({updatedAt:-1})
    .limit(parseInt(limit))
    .skip(((page-1)*limit))
    .then((result)=>{
        if (result == null || result.length == 0 ) {
            res.json(result);
            res.end();
        }else{
            res.json(result);
            res.end();
        }
    })
    .catch((error)=>{
        console.log(error);
        res.end()
    });
}

function findRecentQuizes(req, res, searchQuery, limit, page){
    Quiz.find(searchQuery)
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
