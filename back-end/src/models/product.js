const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        max: 4000,
    },
    offer: {
        type: Number
    },
    productImages: [{
        img: { type: String }
    }],
    reviews: [
        {
            // khóa ngoại; ref: tham chiếu đến bảng khác
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String,
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',required:true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required:true},
    updateAt: Date,

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema);