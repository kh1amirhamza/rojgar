const History = require('../models/history')

module.exports = {
     getHistory(id, req, res){
    
        var searchQuery ={}
        if (id) {
            searchQuery = {"_id" : id}
            findHistory(req, res, searchQuery)
        }else{
            res.json({"message": "invalid  query"});
            res.end();
        }
  },
  getTodayHistory(id, req, res){
    
    var searchQuery ={}
    if (id) {
        searchQuery = {"_id" : id}
        findTodayHistory(req, res, searchQuery)
    }else{
        res.json({"message": "invalid  query"});
        res.end();
    }
}

}

function findHistory(req, res, searchQuery){

    History.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            if (result==null) {
                res.json({"message": "History not found."});
                res.end();
            }else{
                res.json(result.data);
                res.end();
            }
        }
    });
}

function findTodayHistory(req, res, searchQuery){
    const {date} = req.query;

    History.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            if (result==null) {
                res.json({"message": "History not found."});
                res.end();
            }else{
                // const date = new Date();
                // const year = date.getFullYear();
                // const month = date.getMonth()+1;
                // const day = date.getDate();
                // const today_complete_date = day+"/"+month+"/"+year;

                let todayHistory = [];
                for (let index = 0; index < result.data.length; index++) {
                    const element = result.data[index];
                    if (element.date == date) {
                        todayHistory.push(element);
                    }
                }

                res.json(todayHistory);
                res.end();
            }
        }
    });
}

