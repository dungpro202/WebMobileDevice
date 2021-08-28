const Order = require("../../models/order");
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

exports.getOrdersByAccountId = (req, res) => {
    const { accountId } = req.params;
    if (accountId) {
        Order.find({ user: accountId })
            .select("_id paymentStatus items")
            .populate("items.productId", "_id name productImages")
            .exec((error, orders) => {
                if (error) return res.status(400).json({ error });
                if (orders) {
                    res.status(200).json({ orders });
                }
            });
    } else {
        return res.status(400).json({ error: "Params required" });
    }
};


