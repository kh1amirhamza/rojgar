const express = require("express");
const withdrawRouter = express.Router();
const Update = require('../withdraw/update')
const Add = require('../withdraw/add')
const Get = require('../withdraw/get')

withdrawRouter.post("/add", function (req, res) {
    Add.addWithdraw(id);
});

withdrawRouter.get("/get/all",(req, res)=>{
    Get.getAllWithdrawItems(req, res);
})

withdrawRouter.get("/get/:id",(req, res)=>{
    let id = req.params.id;
    Get.getWithdraw(id, req, res);
})

//push item to array
withdrawRouter.post("/push/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.pushWithdrawItem(id, req, res);
})


//Update Withdraw array item
withdrawRouter.patch("/update/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateWithdrawItem(id, req, res);
})

module.exports = withdrawRouter;


