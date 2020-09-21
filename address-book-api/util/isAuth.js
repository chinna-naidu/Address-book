const jwt = require('jsonwebtoken');
const secret = require('./secret');
const User = require('../models/user');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    let decodedToken;
    if(!token) {
        throw new Error('token not found');
    }
    try {
        decodedToken = jwt.verify(token,secret)
    } catch(err) {
        throw err;
    }
    if(!decodedToken) {
        throw new Error('not Authenticated');
    }
    console.log(decodedToken);
    User.findByPk(decodedToken.userid)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
}