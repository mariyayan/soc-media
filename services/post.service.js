const mongoose = require('mongoose');
const Post = require('../models/Post');
const { User } = require('../models/User');


const createPostInDB = async function(refreshToken, postImgs, postText) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    let imgsArr = postImgs.map(file => `/uploads/${file.filename}`);
    let post = await Post.create({ author: user._id, time: new Date(), imgSrcs: imgsArr, text: postText, });

    let postData = {
        userImgSrc: user.imgSrc,
        userName: user.name,
        postReposted: false,
        post: { _id: post._id, time: post.time, text: post.text, imgSrcs: post.imgSrcs },
        liked: false,
        likesCount: 0,
        repostsCount: 0,
        reposted: false
    }
    await mongoose.disconnect();
    return postData;
};

const likePost = async function(refreshToken, postId) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    let post = await Post.findById(postId);
    let isLiked = post.likes.find(id => id.equals(user._id));
    if (isLiked) return post.likes.length;
    post.likes.push(user._id);
    await post.save();
    await mongoose.disconnect();
    return post.likes.length;
};

const repostPost = async function(refreshToken, postId) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    let post = await Post.findById(postId);
    let isReposted = post.reposts.find(obj => obj.id.equals(user._id));
    if (isReposted) return post.reposts.length;
    post.reposts.push({ id: user._id, time: new Date() });
    await post.save();
    await mongoose.disconnect();
    return post.reposts.length;
};

module.exports = {
    createPostInDB,
    likePost,
    repostPost,
};