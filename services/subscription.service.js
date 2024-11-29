const mongoose = require('mongoose');
const { User } = require('../models/User');

const changeSubscription = async function(refreshToken, id, actionType) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    let subscribedUser = await User.findById(id);
    if (!subscribedUser) {
        return { isError: true };
    }
    let result;
    if (actionType === 'subscribe') {
        user.subscriptions.push(subscribedUser._id);
        subscribedUser.subscribers.push(user._id);
        result = true;
    } else if (actionType === 'unsubscribe') {
        user.subscriptions.pull(subscribedUser._id);
        subscribedUser.subscribers.pull(user._id);
        result = false;
    }
    await user.save();
    await subscribedUser.save();
    await mongoose.disconnect();
    return result;
};

module.exports = {
    changeSubscription
};