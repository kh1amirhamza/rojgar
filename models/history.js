const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnections = require('../dbConnections')
var cattCashDbConnection = dbConnections.getCattCashDbConnection();

const item = {
    _id: {type: String, required: true},
    type: {type: String, required: true},
    point: {type: Number, required: true},
    date: {type: String, required: true}
}
const data = [item]
//const data = [{type: item, required: true}]// not tested

const historySchema = new Schema({
    _id:{type: String, required: true},
    data: {type: data, required: true}
},
{timestamps: true});

const History = cattCashDbConnection.model('History', historySchema, "history");
module.exports = History;