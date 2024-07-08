const config = require('../config/config')
const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization
    if(!token) {
        return res.status(401).send({ error: 'Not Authorized, you need to login' });
    }

    jwt.verify(token.split(' ')[1], config.JWT_SECRET, async function(err, decodedToken) {
        if (err) {
            return res.status(401).send({ error: 'Not Authorized, invalid token' });
        }
        try {
            const foundUser = await User.findById(decodedToken.user_id);
            if(!foundUser) {
                return res.status(401).send({ error: 'Not Authorized, invalid token, user not found' });
            }
            res.locals.user = foundUser;
        } catch (err) {
            return res.status(401).send({ error: 'Not Authorized, invalid token' });
        }
        next();
    });

}
