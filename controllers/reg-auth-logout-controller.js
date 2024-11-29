const { registerUserInDB, authenticateUserInSystem, deleteRefreshToken, } = require('../services/reg-auth-logout.service.js');

const setCookies = function(res, tokensData) {

    const [jwt, jwtExpiration, refreshToken] = tokensData;
    res.cookie('jwt', jwt, { maxAge: 3600000 }
        //,secure: true, httpOnly:true, sameSite:true}
    );
    res.cookie('jwtExpiration', jwtExpiration, { maxAge: 3600000 }
        //,secure: true, httpOnly:true, sameSite:true}
    );
    res.cookie('refreshToken', refreshToken, { maxAge: 3600000 }
        //,secure: true, httpOnly:true, sameSite:true}
    );
};


const unsetCookies = function(res) {
    res.clearCookie('refreshToken');
    res.clearCookie('jwt');
    res.clearCookie('jwtExpiration');
};

const registerUser = async function(req, res) {
    let [result, tokens, data] = await registerUserInDB(req.body.login, req.body.password, req.body.name, req.file.filename);
    if (!result) {
        return res.json(tokens);
    }
    setCookies(res, tokens);
    res.json(data);
};

const authenticateUser = async function(req, res) {
    let [result, tokens, data] = await authenticateUserInSystem(req.body.login, req.body.password);
    if (!result) {
        return res.json(tokens);
    }
    setCookies(res, tokens);
    res.json(data);
};


const logoutUser = async function(req, res) {
    await deleteRefreshToken(req.cookies['refreshToken']);
    unsetCookies(res);
    return res.json(true);
};


module.exports = {
    registerUser,
    authenticateUser,
    logoutUser,
    setCookies,
    unsetCookies
};