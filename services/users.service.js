const mongoose = require('mongoose');
const Post = require('../models/Post');
const { User } = require('../models/User');

const checkIsSubcribed = function(authUser, userId) {
    if (!authUser) return false;
    if (authUser._id.equals(userId)) return false;
    let subscribed = false;
    for (let id of authUser.subscriptions) {
        let result = id.equals(userId);
        if (result) {
            subscribed = true;
            break;
        }
    }
    return subscribed;
};


const getUsersByType = async function(usersType, searchedUser, authUser) {

    let usersData = [];
    let users;
    let isNonSubscriptions = usersType === 'allUsers' ? true : false;
    let count = 0;

    if (isNonSubscriptions) {
        users = await User.find({}, { _id: 1, name: 1, imgSrc: 1, subscriptions: 1, subscribers: 1 }).lean();
        users.forEach((user, ind, arr) => user._id.equals(authUser._id) ? arr.splice(ind, 1) : null);
    } else {
        users = searchedUser[usersType];

        if (!users.length) {
            return [];
        }
    }

    for (let userId of users) {
        let user = isNonSubscriptions ? users[count++] : await User.findById(userId, { _id: 1, name: 1, imgSrc: 1, subscriptions: 1, subscribers: 1 }).lean();
        let subscribed = checkIsSubcribed(authUser, user._id);

        usersData.push({
            _id: user._id,
            name: user.name,
            imgSrc: user.imgSrc,
            subscriptionsQuantity: user.subscriptions.length,
            subscribersQuantity: user.subscribers.length,
            subscribed: subscribed
        });
    }
    return usersData;
};

const findUsers = async function(paramId, refreshToken) {
    let authUser;
    let user = await User.findById(paramId, { _id: 1, name: 1, imgSrc: 1, subscriptions: 1, subscribers: 1, posts: 1 }).lean();
    if (!user) {
        return [false, { isError: true, errorMessage: 'error' }];
    }
    if (refreshToken) {
        authUser = await User.getUserByRefreshToken(refreshToken);
    }
    return [user, authUser];
};


const getUserFromDB = async function(refreshToken, id) {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let [user, authUser] = await findUsers(id, refreshToken);
    if (!user) {
        await mongoose.disconnect();
        return [user, authUser];
    }


    let isSubscribed = !authUser ? false :
        authUser._id.equals(user._id) ?
        false : Boolean(authUser.subscriptions.find(id => id.equals(user._id)));

    let [posts, repostedPosts] = await Post.getPosts(user, authUser);

    if (repostedPosts.length) {

        for (let repostedPost of repostedPosts) {

            let author = await User.findById(repostedPost.author);
            let isLiked = repostedPost.likes.find(id => id.equals(user._id));
            let repostTime = repostedPost.reposts.find(obj => obj.id.equals(user._id)).time;

            posts.push({
                userName: user.name,
                userImgSrc: user.imgSrc,
                postReposted: true,
                post: { _id: repostedPost._id, authorId: author._id, authorImgSrc: author.imgSrc, authorName: author.name, time: repostedPost.time, repostTime: repostTime, imgSrcs: repostedPost.imgSrcs, text: repostedPost.text },
                liked: Boolean(isLiked),
                likesCount: repostedPost.likes.length,
                repostsCount: repostedPost.reposts.length,
                reposted: true
            });
        }
        posts.sort((a, b) => (b.post.repostTime ? b.post.repostTime : b.post.time) - (a.post.repostTime ? a.post.repostTime : a.post.time));

    }

    await mongoose.disconnect();
    return [user, isSubscribed, posts];
};


const getUsersFromDB = async function(refreshToken, id, usersType) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let [user, authUser] = await findUsers(id, refreshToken);
    if (!user) {
        await mongoose.disconnect();
        return [user, authUser];
    }

    let users = await getUsersByType(usersType, user, authUser);
    await mongoose.disconnect();
    return [users];
};


const changeUserData = async function(refreshToken, dataType, newData) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    let data = dataType === 'imgSrc' ? `/uploads/${newData}` : newData;
    user[dataType] = data;
    await user.save();
    await mongoose.disconnect();
    return data;
};


module.exports = {
    getUserFromDB,
    getUsersFromDB,
    changeUserData,
};