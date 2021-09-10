const jwt = require("jsonwebtoken");

const shortid = require('shortid');
const multer = require('multer');
const path = require('path')

//Cấu hình DiskStorage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //path của thư muc cha hien tai + uploads
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

// thu muc luu file upload
exports.upload = multer({ storage });


//token
//Header
// Content-type : application/json
//Authorization : Bearer token

// kiem tra user
exports.requireSignin = (req, res, next) => {

    if (req.headers.authorization) {
        // tach token
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user)
        req.user = user;
        // jwt.decode()
    } else {
        // neu ko co token tra lai uy quyen
        return res.status(400).json({ message: ' Ban ko co token' });
    }

    next();
}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: 'khong co quyen truy cap ' });
    }
    next();
}

// Kiemtra  role admin
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'Ban khong co quyen truy cap Admin' })
    }
    next();
}