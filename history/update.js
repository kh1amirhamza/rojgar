const History = require('../models/history')

module.exports = {
    updateHistory(id, req, res) {
        const query = { "_id": id };

        // const date = new Date();
        // const year = date.getFullYear();
        // const month = date.getMonth()+1;
        // const day = date.getDate();
        // const complete_date = day+"/"+month+"/"+year;
        //
        const {date } = req.query;
        const history_item = {
            _id: "H" + Date.now(),
            type: req.body.type,
            point: req.body.point,
            date: date            
        }

        History.update(query,
            {
                $push: {
                    data: {
                        $each: [history_item],
                        $position: 0
                    }
                }
            },

            function (error, result) {
                if (error) {
                    res.end();
                }
                console.log({message: result.n});
                if (result.n = 1) {
                    res.json({message: result.n})
                }
                res.end();

            })
    }
}