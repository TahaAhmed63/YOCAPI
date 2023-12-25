// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')
    const tokenWithoutBearer = token.split(' ')[1];

console.log(tokenWithoutBearer,"token2")

    if (!tokenWithoutBearer) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided.' });
    }

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token.' });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
