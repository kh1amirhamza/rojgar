const Package = require('../models/package');

module.exports = {
    addPackage(id) {
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

        package.save().then((result) => {
            console.log("Uploading Package to MongoDB has successful.");
            console.log(result);
            //res.json(result);
            //res.end();
        }).catch((error) => {
            console.log("Uploading Package to MongoDB has Failed: error: " + error);
            ///res.json({ message: "Package add Failed" });
            //res.end();
        })
    }
}
