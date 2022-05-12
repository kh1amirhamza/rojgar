const Quiz = require('../models/quiz')

module.exports = {
    addQuiz(req, res){
       var qData = req.body;
       const id = "Q" + Date.now();

    //    let current = new Date();
    //    let vData = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    //    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    //    let dateTime = cDate + ' ' + cTime;

       const quiz = new Quiz({
           _id: id,
           data: {
               question: qData.question,
               opt1: qData.opt1,
               opt2: qData.opt2,
               opt3: qData.opt3,
               opt4: qData.opt4,
               ans: qData.ans
           }
       });

       quiz.save().then((result)=>{
           console.log("Uploading Quiz to MongoDB has successful.");
           console.log(result);
           res.json(result);
           res.end();
       }).catch((error)=>{
           console.log("Uploading Quiz to MongoDB has Failed: error: " + error);
           res.json({ message: "Quiz add Failed" });
           res.end();
       })
 }
}

