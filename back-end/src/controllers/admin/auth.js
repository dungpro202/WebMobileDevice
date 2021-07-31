const User = require('../../models/user');
const shortid = require("shortid");
const jwt = require("jsonwebtoken");


exports.signup = (req, res) => {
    // email ko trung lap => co the tim kim theo email
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            // da toon tai user
            if (user) {
                return res.status(400).json({ message: 'Admin already registered' })
            };

            const {
                firstName,
                lastName,
                email,
                password,
            } = req.body;

            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: shortid.generate(),
                role: 'admin'
            })

            _user.save((error, data) => {
                if (error) {
                    console.log(data)
                    return res.status(400).json({ error })
                }
                if (data) {
                    return res.status(201).json({
                        message: "Admin created successfull"
                    })
                }
            });

        })
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({ error });
            }

            if (user) {

                //tao token va tzian cua token
                if (user.authenticate(req.body.password) && user.role === 'admin') {
                    const token = jwt.sign({ _id: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, email, role, fullName
                        }
                    })
                } else {
                    //neu mk ko dung
                    return res.status(404).json({ message: 'Invalid password' })
                }

            } else {
                return res.status(400).json({ message: 'Something went wrong,Invalid  email' })
            }

        })
}

exports.requireSignin = (req, res, next) => {
    // tach token
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
    // jwt.decode()
}