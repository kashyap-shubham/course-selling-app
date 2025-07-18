const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.ADMIN_JWT);
        if (decoded) {
            req.adminId = decoded.id;
            next()
        } else {
            req.status(403).json({
                message: "You are not signed in"
                })
        }
    } catch(error) {
        return res.status(401).json({
            message: "Unauthrized access"
        })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware 
}