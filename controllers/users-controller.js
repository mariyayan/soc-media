const { getUserFromDB, getUsersFromDB, changeUserData, } = require('../services/users.service.js');

const getMainPage = async function(req, res) {
  res.sendFile(__dirname + '../public/index.html');
};


const getUser = async function(req, res) {
let [user, data, posts] = await getUserFromDB(req.cookies['refreshToken'], req.params["id"]);
if(!user){
    return res.json(data);
}
return res.json({
  user:{
  _id: user._id, name: user.name, imgSrc: user.imgSrc, isSubscribed: data, subscriptionsQuantity: user.subscriptions.length, subscribersQuantity: user.subscribers.length},
  posts: posts});
};


const getUsers =  async function(req, res) {
let [users, data] = await getUsersFromDB(req.cookies['refreshToken'], req.params["id"], req.params["usersType"]);
if(!users){
    return res.json(data);
}
return res.json(users);
};


const setUserPhoto = async function(req, res){
  let data = await changeUserData(req.cookies['refreshToken'], 'imgSrc', req.file.filename);
  res.json(data);
};


const setUserName = async function(req, res){
  let data = await changeUserData(req.cookies['refreshToken'], 'name', req.body.name);
  res.json(data);
};


module.exports = {
getMainPage,
getUser,
getUsers,
setUserPhoto,
setUserName,
    };





