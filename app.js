const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const usersRoutes = require('./routes/users-routes');
const postRoutes = require('./routes/post-routes');
const subscriptionRoutes = require('./routes/subscription-routes');
const regAuthLogoutRoutes = require('./routes/reg-auth-logout-routes');


app.use(cookieParser());
app.use(express.static(__dirname + "/public/"));

app.use(usersRoutes);
app.use(postRoutes);
app.use(subscriptionRoutes);
app.use(regAuthLogoutRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`)
});