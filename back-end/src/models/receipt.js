const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            productPrice: {
                type: Number,
            },
            productQty: {
                type: Number,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updateAt: Date,

}, { timestamps: true })

module.exports = mongoose.model('Receipt', receiptSchema);