const express = require("express");
const constantRouter = express.Router();
const Update = require('./update')
const Add = require('./add')
const Get = require('./get')

//Add
constantRouter.post("/add", function (req, res) {
    Add.addConstant(req, res);
});

//Get
constantRouter.get("/get",(req, res)=>{
    Get.getConstant(req, res);
})

//update
constantRouter.patch("/update/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateConstant(id, req, res);
})

module.exports = constantRouter;