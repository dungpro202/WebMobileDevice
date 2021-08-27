const User = require("../../models/user");


exports.getListAccount = async (req, res) => {
    const accounts = await User.find({ role: "user" })
        .exec((error, accounts) => {
            //Loi mongodb
            if (error) {
                return res.status(400).json({ error })
            }
            //Tim thanh cong
            if (accounts) {
                return res.status(200).json({ accounts: accounts })
            }
        });
};


