const mongoose = require('mongoose');
const config = {useNewUrlParser: true, useUnifiedTopology: true };
//const catCashDbConnectUrl = "mongodb+srv://rojgar:rojgar@cluster0.p4fnz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const catCashDbConnectUrl = "mongodb+srv://rojgar:rojgar@cluster0.4ymswlv.mongodb.net/?retryWrites=true&w=majority"
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