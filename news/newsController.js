const express = require("express");
const newsRouter = express.Router();
const Update = require('../news/update')
const Delete = require('../news/delete')
const Add = require('../news/add')
const Get = require('../news/get')

newsRouter.post("/add", function (req, res) {
    Add.addNews(req, res);
});



newsRouter.get("/get/recent",(req, res)=>{
    Get.getRecentNews(req, res);
})

newsRouter.get("/get/:id",(req, res)=>{
    let id = req.params.id;
    Get.getNews(id, req, res);
})


//update
newsRouter.patch("/update/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateNews(id, req, res);
})


//delete
newsRouter.delete("/delete/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Delete.deleteNews(id, req, res);
})


module.exports = newsRouter;


