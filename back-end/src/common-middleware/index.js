const jwt = require("jsonwebtoken");


//token
//Header
// Content-type : application/json
//Authorization : Bearer token
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
        return res.status(400).json({ message: 'Authorization required, Ban ko co token' });
    }

    next();
}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: 'User acess denied,khong co quyen truy cap' });
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