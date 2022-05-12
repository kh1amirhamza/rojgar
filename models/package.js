const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnections = require('../dbConnections')
var cattCashDbConnection = dbConnections.getCattCashDbConnection();

const packageData = {
    current_name: {type: String, required: true},
    update_name: {type: String, required: true},
    valid_time: {type: Number, required: true},
    phone_number: {type: String, required: true},
    method: {type: String, required: true},
    transection: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, required: true},
    issued_at: {type: Number, required: true},
    expired_at: {type: Number, required: true}
}

const packageSchema = new Schema({
    _id:{type: String, required: true},//userId
    data: {type: packageData, required: true}
},
{timestamps: true});

const Package = cattCashDbConnection.model('Package', packageSchema, "package");
module.exports = Package;