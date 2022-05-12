const User = require('../models/user')
module.exports = {
    updateUser(id, req, res) {
        updateUser(id, req, res);
    },
    findThenUpdateUserPoint(id, req, res){
        findThenUpdateUserPoint(id, req, res);
    }
}

function findThenUpdateUserPoint(id, req, res){
    const searchQuery = { "_id": id }
    User.findOne(searchQuery, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            if (result == null) {
                res.json({ "message": "User not found." });
                res.end();
            } else {
                
                console.log(result.data.point);
                console.log(req.body.point);
                let addpoint = 0;
                if (req.body.point != null) {
                    addpoint =req.body.point;
                }
                result.data.point = result.data.point + addpoint;

                User.updateOne(searchQuery, { $set: result }, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({"message": err})
                        res.end();
                        return;
                    } else {
                        console.log({ message: result.n });
                        if (result.n = 1) {
                            res.json({ message: "Point updated.", resultCode : 1 })
                            res.end();
                        } else {
                            res.json({ message: "Can  not update point." });
                            res.end();
                        }
                    }
                });
            }
        }
    });
}

function updateUser(id, req, res) {

    const searchQuery = { "_id": id }

    if (req.body.data == null && req.body.package == null && req.body.auth == null) {
        res.json({ message: "Input is not valid. data or package or auth and their minimum single phoperty needed" })
        res.end();
        return;
    }

    User.findOne(searchQuery, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            if (result == null) {
                res.json({ "message": "User not found." });
                res.end();
                return;
            } else {
                if (req.body.data) {
                    const { name, email, phone_number, image_url, point } = req.body.data;
                    name ? result.data.name = name : {}
                    phone_number ? result.data.phone_number = phone_number : {}
                    email ? result.data.email = email : {}
                    image_url ? result.data.image_url = image_url : {}
                    point ? result.data.point = point : {}
                }

                if (req.body.package) {
                    const { current_title, update_title, valid_time, phone_number, method, transaction, amount,
                        status, issued_at, expired_at } = req.body.package;
                    current_title ? result.package.current_title = current_title : {};
                    update_title ? result.package.update_title = update_title : {};
                    valid_time ? result.package.valid_time = valid_time : {};
                    phone_number ? result.package.phone_number = phone_number : {};
                    method ? result.package.method = method : {};
                    transaction ? result.package.transaction = transaction : {};
                    amount ? result.package.amount = amount : {};
                    status ? result.package.status = status : {};
                    issued_at ? result.package.issued_at = issued_at : {};
                    expired_at ? result.package.expired_at = expired_at : {};
                }

                if (req.body.auth) {
                    const { phone_number, password } = req.body.auth;
                    phone_number ? result.auth.phone_number = phone_number : {}
                    password ? result.auth.password = password : {}
                }
                // if (copyResult == result) {
                //     res.json({ message: "Input is not valid. data or auth and their minimum single phoperty needed" })
                //     res.end();
                //     return;
                // }

                User.updateOne(searchQuery, { $set: result }, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.end();
                        return;
                    } else {
                        console.log({ message: result.n });
                        if (result.n = 1) {
                            // User.findOne(searchQuery, function (error, result) {
                            //     if (error) {
                            //         console.log(error);
                            //     } else {
                            //         res.json(result);
                            //         res.end();
                            //     }
                            // })
                            res.json({ message: "User updated." })
                            res.end();

                        } else {
                            res.end();
                        }
                    }
                });
            }
        }
    });
}