const express = require("express");
const packageRouter = express.Router();
const Update = require('./update')
const Add = require('./add')
const Get = require('./get')

packageRouter.post("/add", function (req, res) {
    Add.addPackage(id);
});

packageRouter.get("/get/:id",(req, res)=>{
    let id = req.params.id;
    Get.getPackage(id, req, res);
})

//update
packageRouter.patch("/update/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
    Update.updatePackage(id, req, res);
})


module.exports = packageRouter;


