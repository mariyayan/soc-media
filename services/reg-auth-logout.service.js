const mongoose = require('mongoose');
const { User } = require('../models/User');


const setJWTAndRefreshTokens = async function(user) {
    let [jwt, jwtExpiration] = user.generateJWTToken();
    let refreshToken = user.generateRefreshToken();
    await user.save();
    return [jwt, jwtExpiration, refreshToken];
}

const deleteRefreshToken = async function(refreshToken) {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    if (user) {
        await removeUserRefreshToken(user);
    }
    await mongoose.disconnect();
};


const generateNewRefreshToken = async function(refreshToken, user) {
    let tokensData = await setJWTAndRefreshTokens(user);
    return tokensData;
};

const removeUserRefreshToken = async function(user) {
    user.refreshToken = null;
    await user.save();
}


const checkAndRefreshTokens = async function(refreshToken, jwtExpiration) {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    if (!user) {
        await mongoose.disconnect();
        return false;
    }
    let nowTime = new Date();
    let timeDifference = Math.round((jwtExpiration - nowTime) / 60000);

    if (timeDifference <= 15) {

        if (user.expirationRefreshToken <= nowTime) {
            await removeUserRefreshToken(user);
            await mongoose.disconnect();
            return false;
        }
        let tokensData = await setJWTAndRefreshTokens(user);
        await mongoose.disconnect();
        return tokensData;
    }
    await mongoose.disconnect();
    return true;
};




const registerUserInDB = async function(login, password, name, imgSrc) {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let isUserExists = await User.isLoginExists(login);
    if (isUserExists) {
        await mongoose.disconnect();
        return [false, { 'isError': true, 'errorMessage': 'Пользователь с таким логином уже существует' }];
    }
    let imgSrcPath = `/uploads/${imgSrc}`;
    let user = await User.create({ login, name, imgSrc: imgSrcPath});
    user.setPassword(password);
    let tokensData = await setJWTAndRefreshTokens(user);
    await mongoose.disconnect();
    return [true, tokensData, { isAuth: true, userId: user._id }];
};


const authenticateUserInSystem = async function(login, password) {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.isLoginExists(login);
    if (!user) {
        await mongoose.disconnect();
        return [false, { 'isError': true, 'errorMessage': 'Пользователя с таким логином не существует' }];
    }
    let passwordValidationResult = user.validatePassword(password);
    if (!passwordValidationResult) {
        await mongoose.disconnect();
        return [false, { 'isError': true, 'errorMessage': 'Неверный пароль' }];
    }
    let tokensData = await setJWTAndRefreshTokens(user);
    await mongoose.disconnect();
    return [true, tokensData, { isAuth: true, userId: user._id }];
};

module.exports = {
    deleteRefreshToken,
    checkAndRefreshTokens,
    registerUserInDB,
    authenticateUserInSystem,
};