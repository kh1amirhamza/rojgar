const express = require("express");
const videoRouter = express.Router();
const Update = require('./update')
const Delete = require('./delete')
const Add = require('./add')
const Get = require('./get')

videoRouter.post("/add", function (req, res) {
    Add.addVideo(req, res);
});



// videoRouter.get("/get/recent",(req, res)=>{
//     Get.getRecentVideo(req, res);
// })

videoRouter.get("/get/all",(req, res)=>{
    let id = req.params.id;
    Get.getAllVideos(req, res);
})

videoRouter.get("/get/:id",(req, res)=>{
    let id = req.params.id;
    Get.getVideo(id, req, res);
})



//update
videoRouter.patch("/update/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateVideo(id, req, res);
})


//delete
videoRouter.delete("/delete/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Delete.deleteVideo(id, req, res);
})


module.exports = videoRouter;


