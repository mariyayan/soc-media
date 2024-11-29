const express = require('express');
const router = express.Router();
const {
    registerUser,
    authenticateUser,
    logoutUser,
} = require('../controllers/reg-auth-logout-controller');
const {
    checkReqBody,
    checkCookies,
    upload,
    textParser
} = require('../middlewares/middlewares');


router.post('/registration', upload.single('imgSrc'), checkReqBody, checkCookies, checkReqBody, registerUser);
router.post('/authentication', textParser.none(), checkReqBody, checkCookies, authenticateUser);
router.get('/logout', checkCookies, logoutUser);

module.exports = router;