const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware to authenticate JWT from cookies
exports.verifyToken = (req, res, next) => {
    // Get the token from the cookie
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.company = decoded; // Attach company info to request object
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
