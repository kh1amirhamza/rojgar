const Package = require('../models/package')
const User = require('../models/user')
module.exports = {
     getPackage(id, req, res){
        if (id) {
            findPackage(id, req, res)
        }else{
            res.json({"message": "invalid  query"});
            res.end();
        }
  }
}

function findPackage(id, req, res){
    const searchQuery = {"_id" : id};

    Package.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            if (result==null) {
                res.json({"message": "Package not found."});
                res.end();
            }else{
                
                if (result.data.issued_at > result.data.expired_at) {
                    //updatePackageToRegular(id, req, res);
                    updateUserPackageToRegular(id, req, res);
                }else{
                    res.json(result);
                    res.end();
                }
            }
        }
    });
}

function updateUserPackageToRegular(id, req, res){
    const searchQuery = {"_id": id};
    User.findOne(searchQuery, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            if (result == null) {
                res.json({ "message": "User not found." });
                res.end();
                return;
            } else {
                result.data.package = "Regular"
                User.updateOne(searchQuery, { $set: result }, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.end();
                        return;
                    } else {
                        console.log({ message: result.n });
                        if (result.n = 1) {
                            updatePackageToRegular(id, req, res)
                        } else {
                            res.json({ message: "User package can not update" })
                            res.end();
                        }
                    }
                });
            }
        }
    });
}

function updatePackageToRegular(id, req, res){
    const searchQuery = {"_id": id};
    const package = new Package({
        _id: id,
        data: {
            current_name: "Regular",
            update_name: "...",
            valid_time: Number.MAX_SAFE_INTEGER,
            phone_number: "...",
            method: "...",
            transection: "...",
            amount: 0,
            status: "Approved",
            issued_at: 0,
            expired_at: Number.MAX_SAFE_INTEGER
        }
    });

    Package.updateOne(searchQuery, { $set: package }, (err, result) => {
        if (err) {
            console.log(err);
            res.end();
            return;
        } else {
            console.log({ message: result.n });
            if (result.n = 1) {
                //findPackage(id, req, res);

                updateUserPackageToRegular(id, req, res);
            } else {
                res.json({ message: "Package can not update" })
                res.end();
            }
        }
    });
}
