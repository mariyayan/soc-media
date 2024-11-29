const mongoose = require('mongoose');
const { Schema } = mongoose;
const postSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: Date,
    imgSrcs: Array,
    text: String,
    likes: Array,
    reposts: Array
});



postSchema.statics.getPosts = async function(user, authUser) {

    let posts = [];

    let userPosts = await Post.find({ author: user._id }).sort({ time: 1 });
    let repostedPosts = await Post.find({ reposts: { $elemMatch: { id: { $all: [user._id] } } } });

    if (userPosts.length) {
        for (let userPost of userPosts) {

            posts.push({
                userName: user.name,
                userImgSrc: user.imgSrc,
                postReposted: false,
                post: { _id: userPost._id, time: userPost.time, imgSrcs: userPost.imgSrcs, text: userPost.text },
                liked: Boolean(authUser ? userPost.likes.find(id => id.equals(authUser._id)) : false),
                likesCount: userPost.likes.length,
                repostsCount: userPost.reposts.length,
                reposted: Boolean(authUser ? userPost.reposts.find(obj => obj.id.equals(authUser._id)) : false)
            });
        }
    }

    return [posts, repostedPosts];
};


let Post = mongoose.model('Post', postSchema);

module.exports = Post;