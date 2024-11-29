const express = require('express');
const router = express.Router();
const {
    subscribe,
    unsubscribe,
} = require('../controllers/subscription-controller');

const {
    checkCookies,
    checkParams,
    checkJWTTokenMW,
    checkAndRefreshTokensMW,
} = require('../middlewares/middlewares');

router.get('/subscribe/:id', checkCookies, checkParams, checkJWTTokenMW, checkAndRefreshTokensMW, subscribe);
router.get('/unsubscribe/:id', checkCookies, checkParams, checkJWTTokenMW, checkAndRefreshTokensMW, unsubscribe);

module.exports = router;