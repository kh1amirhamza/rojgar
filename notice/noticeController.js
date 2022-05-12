const express = require("express");
const noticeRouter = express.Router();

noticeRouter.post("/add", function (req, res) {
    const Add = require('./add')
    Add.addNotice(req, res);
});



noticeRouter.get("/get/:id",(req, res)=>{
    const Get = require('./get')
    let id = req.params.id;
    Get.getNotice(id, req, res);
})


//update
noticeRouter.patch("/update/:id", function (req, res) {
    const Update = require('./update')

    let id = req.params.id;
   // console.log(req);
Update.updateNotice(id, req, res);
})


//delete
noticeRouter.delete("/delete/:id", function (req, res) {
    const Delete = require('./delete')

    let id = req.params.id;
   // console.log(req);
Delete.deleteNotice(id, req, res);
})


module.exports = noticeRouter;


