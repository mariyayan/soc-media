const { changeSubscription } = require('../services/subscription.service.js');

const subscribe = async function(req, res) {
    let data = await changeSubscription(req.cookies['refreshToken'], req.params["id"], 'subscribe');
    res.json(data);
};


const unsubscribe = async function(req, res) {
    let data = await changeSubscription(req.cookies['refreshToken'], req.params["id"], 'unsubscribe');
    res.json(data);
};


module.exports = {
    subscribe,
    unsubscribe
};