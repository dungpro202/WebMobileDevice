const User = require('../../models/user');
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');



exports.signup = (req, res) => {
    // email ko trung lap => co the tim kim theo email
    User.findOne({ email: req.body.email })
        .exec( async (err, user) => {
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

            const hash_password= await bcrypt.hash(password,10);

            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
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
                //tao token va tzian cua token cua admin
                if (user.authenticate(req.body.password) && user.role === 'admin') {
                    //token gom 2 tải trọng là id và role
                    const token = jwt.sign({ _id: user._id, role: user.role },
                        process.env.JWT_SECRET,
                        { expiresIn: '1d' }
                    );
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    //luu cookie
                    res.cookie('token', token, { expiresIn: '1d' })
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

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Signout Success.....!' })
}