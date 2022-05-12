const Withdraw = require('../models/witdraw')
const User = require('../models/user')

module.exports = {
    pushWithdrawItem(id, req, res) {
        const query = { "_id": id };

    //    let current = new Date();
    //    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    //    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    //    let dateTime = cDate + ' ' + cTime;

        const withdraw_item = {
            _id: "W" + Date.now(),
            owner_id: req.body.owner_id,
            phone_number: req.body.phone_number,
            method: req.body.method,
            amount: req.body.amount,
            rate: req.body.rate,
            status: req.body.status,
            date: req.body.date
        }

        Withdraw.update(query,
            {
                $push: {
                    data: {
                        $each: [withdraw_item],
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

                    //Customize points to taka convert rate....
                    updateUserPoint(id, req.body.amount * (1000 / 85));
                    res.json({message: result.n})
                    console.log("Withdraw item pushed to withdraw array!");
                }
                res.end();;
            })
    },

    updateWithdrawItem(id, req, res){
        const {item_id} = req.query;

        const withdraw_item = {
            _id: item_id,
            owner_id: req.body.owner_id,
            phone_number: req.body.phone_number,
            method: req.body.method,
            amount: req.body.amount,
            rate: req.body.rate,
            status: req.body.status,
            date: req.body.date        
        }
        
        const searchQuery = {_id: id};

        //find target withdraw item to update its item
        Withdraw.findOne(searchQuery, function(error, result){
            if (error) {
                console.log(error);
            }else{
                if (result==null) {
                    //res.json({"message": "Withdraw not found."});
                    res.end();
                }else{
                    //set data to exact item of withdraw array
                    for (let index = 0; index < result.data.length; index++) {
                        const element = result.data[index];
                        if (element._id==item_id) {
                            result.data[index] = withdraw_item;
                            console.log("Owner Id: " );
                            console.log(withdraw_item.owner_id);

                            //finaly update with new value
                            Withdraw.updateOne(searchQuery, {$set: result}, (err, newResult) => {
                                if (err) {
                                    console.log(err);
                                    res.end();
                                }else{
                                    console.log(newResult);
                                    res.json(newResult)
                                    res.end();
                                }
                              });
                              return;
                        }
                    }
                }
            }
        });
    }
}

function updateUserPoint(id, decreasePoint) {

    const searchQuery = { "_id": id }

    User.findOne(searchQuery, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            if (result == null) {
                console.log("User not found.");
                return;
            } else {
                result.data.point = result.data.point - decreasePoint;
           
                User.updateOne(searchQuery, { $set: result }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        console.log({ message: result.n });
                        if (result.n = 1) {
                            console.log("User point updated");
                        } else {
                            console.log("User point can not update");
                        }
                    }
                });
            }
        }
    });
}