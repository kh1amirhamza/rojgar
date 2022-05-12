const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnections = require('../dbConnections')
var catCashDbConnection = dbConnections.getCattCashDbConnection();

// var userDbConnection = mongoose.createConnection(userDbConnectUrl, config, function(error, result){
//     if (error) {
//         console.log(error)
//     }else{
//         console.log("Connected with User Db!")
//     }
// });

const data = {
    email: {type: String, required: true},
    image_url: {type: String, required: true},
    name: {type: String, required: true},
    phone_number: {type: String, required: true},
    point: {type: Number, required: true},
}
const auth = {
    phone_number: {type: String, required: true},
    password: {type: String, required: true}
}

const package = {
    current_title: {type: String, required: true},
    update_title: {type: String, required: true},
    valid_time: {type: Number, required: true},
    phone_number: {type: String, required: true},
    method: {type: String, required: true},
    transaction: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, required: true},
    issued_at: {type: Number, required: true},
    expired_at: {type: Number, required: true}
}

const userSchema = new Schema({
    _id:{type: String, required: true},
    data: {type: data, required: true},
    package: {type: package, required: true},
    auth: {type: auth, required: true}
},
{timestamps: true});

const User = catCashDbConnection.model('User', userSchema, "user" );
module.exports = User;

