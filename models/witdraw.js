const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnections = require('../dbConnections')
var cattCashDbConnection = dbConnections.getCattCashDbConnection();

const item = {
    _id: {type: String, required: true},
    owner_id: {type: String, required: true},
    phone_number: {type: String, required: true},
    method: {type: String, required: true},
    amount: {type: Number, required: true},
    rate: {type: String, required: true},
    status: {type: String, required: true},
    date: {type: String, required: true}
}
const data = [item]
//const data = [{type: item, required: true}]// not tested

const withdrawSchema = new Schema({
    _id:{type: String, required: true},
    data: {type: data, required: true}
},
{timestamps: true});

const Withdraw = cattCashDbConnection.model('Withdraw', withdrawSchema, "withdraw");
module.exports = Withdraw;