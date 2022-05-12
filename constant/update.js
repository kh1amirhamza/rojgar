const Constant = require('../models/constant')

module.exports = {
     updateConstant(id, req, res){
    let cData = req.body.data;
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

    //console.log(req);
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
    const query = { "_id": "Constant" } ;
    Constant.updateOne(query, {$set: constant}, (err, result) => {
        if (err) {
            console.log(err);
            res.end();
        }else{
            console.log(result);
            res.json(result)
            res.end();
        }
      });
  }
}