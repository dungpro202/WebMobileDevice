const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    town: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    district: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    city: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    address: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    
    addressType: {
        type: String,
        required: true,
        enum: ['home', 'work'],
        required: true
    }
});

const userAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    address: [addressSchema]
}, { timestamps: true });


module.exports = mongoose.model('UserAddress', userAddressSchema);