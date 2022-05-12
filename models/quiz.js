const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnections = require('../dbConnections')
var cattCashDbConnection = dbConnections.getCattCashDbConnection();

const data = {
    question: {type: String, required: true},
    opt1: {type: String, required: true},
    opt2: {type: String, required: true},
    opt3: {type: String, required: true},
    opt4: {type: String, required: true},
    ans: {type: String, required: true},
}

const quizSchema = new Schema({
    _id:{type: String, required: true},
    data: {type: data, required: true}
},
{timestamps: true});

const Quiz = cattCashDbConnection.model('Quiz', quizSchema, "quiz");
module.exports = Quiz;  