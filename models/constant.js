const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnections = require('../dbConnections')
var catCashDbConnection = dbConnections.getCattCashDbConnection();


const package = {
    spin: {type: Number, required: true},
    ads: {type: Number, required: true},
    quiz: {type: Number, required: true},
    price_pm: {type: Number, required: true}
}

const data = {
    regular: {type: package, required: true},
    standard: {type: package, required: true},
    premium: {type: package, required: true},
    point_rate_pk: {type: Number, required: true},
    refer: {type: Number, required: true},
    bkash: {type: String, required: true},
    nagad: {type: String, required: true},
}

const constantSchema = new Schema({
    _id:{type: String, required: true},
    data: {type: data, required: true}
},
{timestamps: true});

const Constant = catCashDbConnection.model('Constant', constantSchema, "constant");
module.exports = Constant;