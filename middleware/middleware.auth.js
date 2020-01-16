const jwt = require('jsonwebtoken');
const keys = require('./../keys');

module.exports = async (req, res, next) => {
    if(req.method === 'OPTION') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; //Bearer TOKEN

        if(!token) {
            return res.status(401).json({ message: 'Нет авторизации' });
        }

        const decoded = jwt.verify(token, keys.JWT_SECRET);
        req.user = decoded;
        next();

    } catch(e) {
        res.status(401).json({ message: 'Нет авторизации' });
    }
};