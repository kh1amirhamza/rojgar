const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnections = require('../dbConnections')
var cattCashDbConnection = dbConnections.getCattCashDbConnection();

const data = {
    title: {type: String, required: true},
    image_url: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true}
}

const noticeSchema = new Schema({
    _id:{type: String, required: true},
    data: {type: data, required: true}
},
{timestamps: true});

const Notice = cattCashDbConnection.model('Notice', noticeSchema, "notice");
module.exports = Notice;