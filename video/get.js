const Video = require('../models/video')

module.exports = {
     getVideo(id, req, res){
        var searchQuery ={}
        if (id) {
            searchQuery = {"_id" : id}
            findVideo(req, res, searchQuery)
        }else{
            res.json({"message": "invalid  query"});
            res.end();
        }
  },
  getAllVideos(req, res){
      findAllVideos(req, res);
  }
  ,
  getRecentVideo(req, res){
    var searchQuery ={}
    const {limit =20 , page =1} = req.query;
    findRecentVideo(res, res, searchQuery, limit, page);
  }
}

function findVideo(req, res, searchQuery){

    Video.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            if (result==null) {
                res.json({"message": "Video not found."});
                res.end();
            }else{
                res.json(result);
                res.end();
            }
        }
    });
}


function findAllVideos(req, res){
    let searchQuery = {};
    const {title, limit=20, page=1, valid} = req.query;

    if (title) {
        searchQuery = { 'data.title' : { '$regex' : title, '$options' : 'i' } }
    }

    Video.find(searchQuery)
    .sort({updatedAt:-1})
    .limit(parseInt(limit))
    .skip(((page-1)*limit))
    .then((result)=>{
        if (result == null || result.length == 0 ) {
            res.json({"message": "Videos not found."});
            res.end();
        }else{
            
            if (valid) {
                if (valid==1) {
                    getValidateVideoByViewCout(req, res, result);
                }else if (valid == 0) {
                    getInvalidateVideoByViewCount(req, res, result);
                }
            }else{
                res.json(result);
                res.end();
            }
        }
    })
    .catch((error)=>{
        console.log(error);
        res.end()
    });
}

function getValidateVideoByViewCout(req, res, result){
    let validVideos = [];
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                if (element.data.current_view < element.data.required_view) {
                    validVideos.push(element);
                    console.log("valid");
                }
            }
            if (validVideos == null || validVideos.length == 0 ) {
                res.json({"message": "Valid Videos not found."});
                res.end();
            }else{
                res.json(validVideos);
                res.end();
            }
}

function getInvalidateVideoByViewCount(req, res, result){
    let invalidVideos = [];
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                if (element.data.current_view > element.data.required_view
                    || element.data.current_view == element.data.required_view) {
                    invalidVideos.push(element);
                    console.log("Invalid");
                }
            }
            if (invalidVideos == null || invalidVideos.length == 0 ) {
                res.json({"message": "Invalid Videos not found."});
                res.end();
            }else{
                res.json(invalidVideos);
                res.end();
            }
}

function findRecentVideo(req, res, searchQuery, limit, page){
    Video.find(searchQuery)
    .sort({updatedAt:-1})//confuse updatedAt or udated_at
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
