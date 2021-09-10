const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('Supplier', supplierSchema);