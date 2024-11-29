const jwt = require('jsonwebtoken');
const { secretKey } = require('../models/User');
const { deleteRefreshToken, checkAndRefreshTokens } = require('../services/reg-auth-logout.service');
const { unsetCookies, setCookies } = require('../controllers/reg-auth-logout-controller');



const mongoose = require('mongoose');


const errorInfo = { isError: true };
const authData = { isAuth: false, userId: null };

async function logOutUser(refreshToken, res) {
    await deleteRefreshToken(refreshToken);
    unsetCookies(res);
}

async function checkTokens(refreshToken, jwtExpiration, res) {
    let result = await checkAndRefreshTokens(refreshToken, jwtExpiration);
    if (!result) {
        unsetCookies(res);
        return false;
    }
    if (Array.isArray(result)) {
        setCookies(res,result);
    }
    return true;
}

const checkJWTToken = async function(jwtToken, jwtExpiration, refreshToken, res) {

    let nowTime = new Date();
    if (jwtExpiration <= nowTime) {
        await logOutUser(refreshToken, res);
        return false;
    }

    try {
        jwt.verify(jwtToken, secretKey);
        return true;
    } catch (e) {
        await logOutUser(refreshToken, res);
        return false;
    }
};


const checkAndRefreshTokensMW = async function(req, res, next) {
    let result = await checkTokens(req.cookies['refreshToken'], req.cookies['jwtExpiration'], res);
    if (!result) {
        return res.json(authData);
    }
    next();
};



const checkJWTTokenMW = async function(req, res, next) {

    let checkJWTTokenResult = await checkJWTToken(req.cookies['jwt'], req.cookies['jwtExpiration'], req.cookies['refreshToken'], res);

    return (checkJWTTokenResult ? next() : res.json(authData));
};



const checkIsTokensCorrect = async function(jwt, jwtExpiration, refreshToken, res) {
    let checkJWTTokenResult = await checkJWTToken(jwt, jwtExpiration, refreshToken, res);
    if (!checkJWTTokenResult) {
        return false;
    }
    let checkTokensResult = await checkTokens(refreshToken, jwtExpiration, res);
    if (!checkTokensResult) {
        return false;
    }
    return true;
};




const checkReqBody = async function(req, res, next) {

    if (req.path === '/registration') {
        if (!(req.body.login && req.body.password && req.body.name && req.file)) {
            return res.json(errorInfo);
        }
        next();
    } else if (req.path === '/authentication') {
        if (!(req.body.login && req.body.password)) {
            return res.json(errorInfo);
        }
        next();
    } else if (req.path === '/createPost') {
        if (!(req.files && req.body.postText)) {
            return res.json(errorInfo);
        }
        next();
    } else if (req.path === '/setUserPhoto') {
        if (!req.file) {
            return res.json(errorInfo);
        }
        next();
    } else if (req.path === '/setUserName') {
        if (!req.body.name) {
            return res.json(errorInfo);
        }
        next();
    }
};

const checkParams = async function(req, res, next) {

    if (req.params.id) {
        let validRes = mongoose.isValidObjectId(req.params.id);

        if (validRes) {
            return next()
        }

        return next()
    }
};




const checkCookies = async function(req, res, next) {
    const path = req.route.path;
    const { jwt, jwtExpiration, refreshToken } = req.cookies;
    if (path === '/createPost' || path === '/like/:id' || path === '/repost/:id' || path === '/subscribe/:id' ||
        path === '/unsubscribe/:id' || path === '/setUserPhoto' || path === '/setUserName') {
        if (jwt && jwtExpiration && refreshToken) {
            return next();
        }
        return res.json(authData);
    } else if (path === '/user/:id' || path === '/getUsers/:id/:usersType') {
        if (jwt && jwtExpiration && refreshToken) {

            let result = await checkIsTokensCorrect(jwt, jwtExpiration, refreshToken, res); 
        
            return (result ? next() : res.json(authData)) 
        }
        return next();
    }
    else if (path === '/registration' || path === '/authentication') {
        if (jwt && jwtExpiration && refreshToken) {
            return res.json(errorInfo);
        }
        return next();
    } else if (req.path === '/logout') {
        if (jwt && jwtExpiration && refreshToken) {
            return next();
        }
        return res.json(authData);
    }
};


const multer = require("multer");
let storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
let upload = multer({ storage: storageConfig });
let textParser = multer();


module.exports = {
    checkReqBody,
    checkCookies,
    checkParams,
    checkJWTTokenMW,
    checkAndRefreshTokensMW,
    upload,
    textParser,
};