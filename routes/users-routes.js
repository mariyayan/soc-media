const express = require('express');
const router = express.Router();
const {
    getMainPage,
    getUser,
    getUsers,
    setUserPhoto,
    setUserName,
} = require('../controllers/users-controller');

const {
    checkReqBody,
    checkCookies,
    checkParams,
    checkJWTTokenMW,
    checkAndRefreshTokensMW,
    upload,
    textParser,
} = require('../middlewares/middlewares');

router.get('/', getMainPage);
router.get('/user/:id', checkParams, checkCookies, getUser);
router.get('/getUsers/:id/:usersType', checkParams, checkCookies, getUsers);

router.post('/setUserPhoto', checkCookies, upload.single('imgSrc'), checkReqBody, checkJWTTokenMW, checkAndRefreshTokensMW, setUserPhoto);
router.post('/setUserName', checkCookies, textParser.none(), checkReqBody, checkJWTTokenMW, checkAndRefreshTokensMW, setUserName);

module.exports = router;