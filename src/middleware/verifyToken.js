const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');  // Ensure this middleware is used in your app

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    console.log("Token : " + token);
    console.log("Using JWT Secret: ", process.env.JWT_SECRET || 'fallback_secret');

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = verifyToken;
