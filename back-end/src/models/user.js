const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        min: 2,
        max: 10,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        min: 2,
        max: 10,
    },
    username: {
        type: String,
        require: true,
        trim: true,
        //chi muc duy nhat
        unique: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    contactNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
    }
    //tzian moi khi save lai
}, { timestamps: true });

// tao mat khau bam
// virtual is a property that is not stored in MongoDB.
userSchema.virtual('password')
    .set(function (password) {
        // this.hash_password = bcrypt.hashSync(password,salt);
        this.hash_password = bcrypt.hashSync(password, 10);
    })

userSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    })

// so sanh mat khau bam
userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password)
    }
}

module.exports = mongoose.model('User', userSchema)