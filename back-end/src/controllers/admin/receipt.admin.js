const Product = require("../../models/product");
const Receipt = require("../../models/receipt");


exports.addReceipt = (req, res) => {

    req.body.createdBy = req.user._id;
    console.log('req.body order :', req.body)
    const receipt = new Receipt(req.body);

    receipt.save(async (error, receipt) => {
        if (error) return res.status(203).json({ error });
        if (receipt) {
            // cong them san pham khi nhap hang
            for (let i = 0; i < receipt.items.length; i++) {
                await Product.findOne({ _id: receipt.items[i].productId })
                    .select('quantity').exec(async (error, product) => {
                        await Product.findOneAndUpdate(
                            { _id: receipt.items[i].productId },
                            {
                                //$inc: { 'quantity': 10 }
                                // "quantity": 5
                                "quantity": receipt.items[i].productQty + product.quantity
                            },
                            { new: true }
                        )
                    })
            }
            return res.status(201).json({ receipt });
        }
    });
};

exports.getAllReceipt = async(req, res) => {

    const receipt = await Receipt.find({})
        .populate("items.productId","name")
        .populate("createdBy","_id email firstName lastName")
        .populate("supplier","_id name address")
        .exec((error, receipt) => {
            if (error) return res.status(203).json({ error });
            if (receipt) {
                return res.status(200).json({ receipts: receipt });
            }
        });
}
