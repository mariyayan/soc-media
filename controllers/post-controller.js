const { createPostInDB, likePost, repostPost } = require('../services/post.service.js');


const createPost = async function(req, res) {
    let data = await createPostInDB(req.cookies['refreshToken'], req.files, req.body.postText);
    res.json(data);
};


const like = async function(req, res) {
    let data = await likePost(req.cookies['refreshToken'], req.params["id"]);
    res.json(data);
};


const repost = async function(req, res) {
    let data = await repostPost(req.cookies['refreshToken'], req.params["id"]);
    res.json(data);
};


module.exports = {
    createPost,
    like,
    repost
};