const Quiz = require('../models/quiz')

module.exports = {
    updateQuiz(id, req, res) {
        const query = { "_id": id };
        var qData = req.body;
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

       Quiz.updateOne(query, {$set: quiz}, (err, result) => {
        if (err) {
            console.log(err);
            res.end();
        }else{
            console.log(result);

            if (result.n == 1) {
                res.json({"message": "Quiz is updated"})
                res.end();
            }else{
                res.json({"message": "Quiz does not update"})
                res.end(); 
            }
        }
      });
    }
}