const mongoose = require('mongoose');
const config = {useNewUrlParser: true, useUnifiedTopology: true };
const catCashDbConnectUrl = "mongodb+srv://catt-cash:catt-cash@cluster0.gpomt.mongodb.net/catt-cash?retryWrites=true&w=majority"
module.exports = {
    getCattCashDbConnection(){
        return mongoose.createConnection(catCashDbConnectUrl, config, function(error, result){
            if (error) {
                console.log(error)
            }else{
                console.log("Connected with CatCash Db!")
            }
        });
    }
}