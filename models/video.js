const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnections = require('../dbConnections')
var cattCashDbConnection = dbConnections.getCattCashDbConnection();

const data = {
    title: {type: String, required: true},
    url: {type: String, required: true},
    current_view: {type: Number, required: true},
    requird_view: {type: Number, required: true}
}

const videoSchema = new Schema({
    _id:{type: String, required: true},
    data: {type: data, required: true}
},
{timestamps: true});

const Video = cattCashDbConnection.model('Video', videoSchema, "video");
module.exports = Video;