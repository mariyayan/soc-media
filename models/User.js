const mongoose = require('mongoose');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const secretKey = 'secret';
const userSchema = new Schema({
    login: String,
    salt: String,
    hash: String,
    refreshToken: String,
    expirationRefreshToken: Date,
    name: String,
    imgSrc: String,
    subscribers: Array,
    subscriptions: Array,
});


userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(String(password), this.salt, 5000, 512, 'sha256').toString('hex');
};



userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(String(password), this.salt, 5000, 512, 'sha256').toString('hex');
    return this.hash === hash;
};



userSchema.methods.generateJWTToken = function() {
    const nowTime = new Date();
    nowTime.setHours(nowTime.getHours() + 1);
    return [jwt.sign({
            login: this.login,
        }, secretKey),
        nowTime
    ];
}

userSchema.methods.generateRefreshToken = function() {
    this.refreshToken = crypto.randomBytes(16).toString("hex");
    const nowTime = new Date();
    nowTime.setDate(nowTime.getDate() + 30);
    this.expirationRefreshToken = nowTime;
    return this.refreshToken;
};


userSchema.statics.getUserByRefreshToken = function(refreshToken) {
    return this.findOne({ refreshToken: refreshToken }, { _id: 1, name: 1, imgSrc: 1, subscriptions: 1, subscribers: 1, posts: 1 });
}

userSchema.statics.isLoginExists = function(userLogin) {
    return this.findOne({ login: userLogin });
}

let User = mongoose.model('User', userSchema);

module.exports = { secretKey, User };