const jwt = require('jsonwebtoken');

function userMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Token missing. Please log in." });
    }

    try {
        const decodedData = jwt.verify(token, process.env.USER_JWT_SECRET);

        if (decodedData) {
            req.userId = decodedData.id;
            next();
        } else {
            res.status(401).json({ message: "Invalid token. Please log in again." });
        }
    } catch (err) {
        res.status(401).json({ message: "Invalid token. Please log in again." });
    }
}

module.exports = {
    userMiddleware
}