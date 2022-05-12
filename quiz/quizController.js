const express = require("express");
const quizRouter = express.Router();
const Update = require('./update')
const Delete = require('./delete')
const Add = require('./add')
const Get = require('./get')

quizRouter.post("/add", function (req, res) {
    Add.addQuiz(req, res);
});

quizRouter.get("/get/filter",(req, res)=>{
    Get.getFilteredQuizes(req, res);
})

quizRouter.get("/get/random",(req, res)=>{
    Get.getRandomQuiz(req, res);
})

quizRouter.get("/get/all",(req, res)=>{
    let id = req.params.id;
    Get.getAllQuizes(req, res);
})

quizRouter.get("/get/:id",(req, res)=>{
    let id = req.params.id;
    Get.getQuiz(id, req, res);
})



//update
quizRouter.patch("/update/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateQuiz(id, req, res);
})


//delete
quizRouter.delete("/delete/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Delete.deleteQuiz(id, req, res);
})


module.exports = quizRouter;


