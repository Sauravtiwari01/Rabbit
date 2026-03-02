const jwt = require("jsonwebtoken")
const User = require("../models/User")

const protectRoute = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.user._id).select("-password")
            next()

        } catch (error) {
            console.log("Token verification fdailed", error);
            res.status(401).json({ message: "Not authorized, Token failed" })

        }
    }
    else {
        res.status(401).json({ message: "Not authorized, No token provided" })
    }
}

// Middleware to check if the user is admin
const admin = async (req, res, next) => {
    if (req.user && req.user.role == "admin")
        next()
    else
        res.status(403).json({ message: "Not authorized as Admin" })
}

module.exports = { protectRoute, admin }