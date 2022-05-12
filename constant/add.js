const Constant = require('../models/constant');

module.exports = {
    addConstant(req, res){
    var cData = req.body.data;

        const regular = {
            spin: cData.regular.spin,
            ads: cData.regular.ads,
            quiz: cData.regular.quiz,
            price_pm: cData.regular.price_pm
        }
        const standard = {
            spin: cData.standard.spin,
            ads: cData.standard.ads,
            quiz: cData.standard.quiz,
            price_pm: cData.standard.price_pm
        }
        const premium = {
            spin: cData.premium.spin,
            ads: cData.premium.ads,
            quiz: cData.premium.quiz,
            price_pm: cData.premium.price_pm
        }
        const point_rate_pk = cData.point_rate_pk
        const refer = cData.refer
        const bkash = cData.bkash
        const nagad = cData.nagad

        const constant = new Constant({
            _id: "Constant",
            data: {
                regular,
                standard,
                premium,
                point_rate_pk,
                refer,
                bkash,
                nagad
            }
        });

        constant.save().then((result)=>{
            console.log("Uploading Constant to MongoDB has successful.");
            console.log(result);
            res.json(result);
            res.end();
        }).catch((error)=>{
            console.log("Uploading Constant to MongoDB has Failed: error: " + error);
            res.json({ message: "Constant add Failed" });
            res.end();
        })
  }
}
