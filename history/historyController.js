const express = require("express");
const historyRouter = express.Router();
const Update = require('../history/update')
//const Add = require('../user/add')
const Get = require('../history/get')

// historyRouter.post("/add", function (req, res) {
//     Add.addUser(id);
// });

historyRouter.get("/get/today/:id",(req, res)=>{
    let id = req.params.id;
    Get.getTodayHistory(id, req, res);
})

historyRouter.get("/get/:id",(req, res)=>{
    let id = req.params.id;
    Get.getHistory(id, req, res);
})

//update
historyRouter.patch("/update/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateHistory(id, req, res);
})


module.exports = historyRouter;


