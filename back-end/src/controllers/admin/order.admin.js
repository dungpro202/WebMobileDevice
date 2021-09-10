const Order = require("../../models/order");

exports.updateOrder = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId, "orderStatus.type": req.body.type },
    {
      $set: {
        "orderStatus.$": [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
        "paymentStatus":req.body.type,
      },
    }
  ).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(201).json({ order });
    }
  });
};

// exports.getCustomerOrders = async (req, res) => {
//   const orders = await Order.find({})
//     .populate("items.productId", "name")
//     .populate("user","_id firstName lastName")
//     .exec();
//     console.log('orders',orders)
//   res.status(200).json({ orders });
// };

exports.getCustomerOrders = async (req, res) => {
  const orders = await Order.find({})
    .exec();
    console.log('orders',orders)
  res.status(200).json({ orders });
};


