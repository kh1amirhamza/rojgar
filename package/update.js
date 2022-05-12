const Package = require('../models/package');
const GetPackage = require('../package/get');

module.exports = {
    updatePackage(id, req, res) {
        const searchQuery = { "_id": id }
        //     let current = new Date();
        //    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        //    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        //    let dateTime = cDate + ' ' + cTime;

        const { current_name, update_name, valid_time, phone_number,
             method, transection, amount,
            status, issued_at, expired_at } = req.body.data;

        Package.findOne(searchQuery, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                if (result == null) {
                    res.json({ "message": "Package not found." });
                    res.end();
                } else {

                    current_name ? result.body.data.current_name = current_name : {};
                    update_name ? result.body.data.update_name = update_name : {};
                    valid_time ? result.body.data.valid_time = valid_time : {};
                    phone_number ? result.body.data.phone_number = phone_number : {};
                    method ? result.body.data.method = method : {};
                    transection ? result.body.data.transection = transection : {};
                    amount ? result.body.data.amount = amount : {};
                    status ? result.body.data.status = status : {};
                    issued_at ? result.body.data.issued_at = issued_at : {};
                    expired_at ? result.body.data.expired_at = expired_at : {};

                    Package.updateOne(searchQuery, { $set: result }, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.end();
                            return;
                        } else {
                            console.log({ message: result.n });
                            if (result.n = 1) {
                                GetPackage.getPackage(id, req, res);
                            } else {
                                res.json({ message: "Package can not update" })
                                res.end();
                            }
                        }
                    });
                }
            }
        });
    }
}