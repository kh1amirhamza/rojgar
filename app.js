const express = require('express');

const app = express();
const { ifError } = require("assert");
const { json } = require("body-parser");
app.use(express.json());

var storage, path;
path = require('path');
const multer = require("multer");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});


const userController = require('./user/userController');
const historyController = require('./history/historyController');
const constantController = require('./constant/constantController');
const newsController = require('./news/newsController');
const withdrawController = require('./withdraw/controller');
const videoController = require('./video/videoController');
const quizController = require('./quiz/quizController');
const noticeController = require('./notice/noticeController');
//const packageController = require('./package/controller');

app.use("/api/user", userController);
app.use("/api/history", historyController);
app.use("/api/constant", constantController);
app.use("/api/news", newsController);
app.use("/api/withdraw", withdrawController);
app.use("/api/video", videoController);
app.use("/api/quiz", quizController);
app.use("/api/notice", noticeController);
//app.use("/package", packageController);

storage = multer.diskStorage({
    destination: './Images/',
    filename: function (req, file, cb) {
        return cb(null, "image_" + new Date().getTime() + (path.extname(file.originalname)));
    }
});

var upload = multer({ storage: storage })

// Uploading image to server hadrdisk then reference will insert to MongoDb...
app.post("/api/uploadImageToGenerateUrl",
    upload.single('uploadImage'),
    function (req, res) {
        console.log(req.file);
        console.log(__dirname + "/Images/" + req.file.filename);
        var ref = { url: "https://my-rojgar.herokuapp.com/Images/" + req.file.filename }
        res.json(ref);
    }
);


//Get Image
app.get("/Images/:imageName", (req, res) => {
    file = req.params.imageName;
    res.sendFile(path.join(__dirname, "./Images/" + file));
});

app.get('/get', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Success");
})
app.get('/app-ads.txt', function (req, res) {

    var fs = require('fs');
    var ads = fs.readFileSync('app-ads.txt', 'utf8')
    //console.log(ads);
    res.send(ads)
    res.end();
})

//For Cpanel...
//app.listen(3000);

//For Cloud Hosting...
const PORT = process.env.PORT || 5000;
app.listen(PORT, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is running on port :' + PORT);
    }
});