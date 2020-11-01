const jsonWebToken = require('jsonwebtoken');
const config = require('config');

var middlewareObject = {};

middlewareObject.isAuthenticated = function (req, res, next) {
    //Get Token from header
    const authToken = req.header('x-auth-token');

    //Check if there is no token
    if (!authToken) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    try {
        const decoded = jsonWebToken.verify(authToken, config.get('jwtSecret'));
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = middlewareObject;