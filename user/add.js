const User = require('../models/user')
const InitHistory = require('../history/add');
const InitWithdraw = require('../withdraw/add');

module.exports = {
     addUser(req, res){
        var uData = req.body.data;
        const id = "U" + Date.now();
        const user = new User({
            _id: id,
            data: {
                name: uData.name,
                phone_number: uData.phone_number,
                image_url: uData.image_url,
                email: uData.email,
                point: uData.point
            },
            package: {
                current_title: "Regular",
                update_title: "...",
                valid_time: Number.MAX_SAFE_INTEGER,
                phone_number: "...",
                method: "...",
                transaction: "...",
                amount: 0,
                status: "Approved",
                issued_at: 0,
                expired_at: Number.MAX_SAFE_INTEGER
            },
            auth: {
                phone_number: req.body.auth.phone_number,
                password: req.body.auth.password
            }
        });

        user.save().then((result)=>{
            console.log("Uploading User to MongoDB has successful.");
            console.log(result);

            InitHistory.addHistory(id);
            InitWithdraw.addWithdraw(id);
            res.json(result);
            res.end();

           

        }).catch((error)=>{
            console.log("Uploading User to MongoDB has Failed: error: " + error);
            res.json({ message: "User add Failed" });
            res.end();
        })
  }
}
