const express = require('express');
const router = express.Router();
const {
    createPost,
    like,
    repost
} = require('../controllers/post-controller');

const {
    checkReqBody,
    checkCookies,
    checkParams,
    checkJWTTokenMW,
    checkAndRefreshTokensMW,
    upload,
} = require('../middlewares/middlewares');

router.post('/createPost', checkCookies, upload.array('postPhotos'), checkReqBody, checkJWTTokenMW, checkAndRefreshTokensMW, createPost);

router.get('/like/:id', checkCookies, checkParams, checkJWTTokenMW, checkAndRefreshTokensMW, like);

router.get('/repost/:id', checkCookies, checkParams, checkJWTTokenMW, checkAndRefreshTokensMW, repost);

module.exports = router;