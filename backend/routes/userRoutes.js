const express = require("express")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const { protectRoute } = require("../middleware/authMiddleware")

const router = express.Router()

// @ROUTE-POST /api/users/register
// @desc Register a new user
// @acess public
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        // Registration logic
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists" })

        user = new User({ name, email, password })
        await user.save()

        // CREATE JWT PAYLOAD
        const payload = { user: { _id: user._id, role: user.role } }

        // SIGN AND RETURN TOKEN
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7D" }, (err, token) => {
            if (err) throw err

            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            })
        })

    } catch (error) {
        console.log(error);
        res.status(500).send("Server error")

    }
})


// @ROUTE POST /api/users/login
// @desc Authenticate user
// @acess public
router.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        // find user email
        let user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: "Invalid credentials" })
        const isMatch = await user.matchPassword(password)

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        // Create JWT payload
        const payload = { user: { _id: user._id, role: user.role } }

        // SIGN AND RETURN TOKEN
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" }, (err, token) => {
            if (err) throw err

            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token,
            })

        }
        )

    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }


})


// @ROUTE GEt /api/users/profile
// @desc Get logged-in User's profile (protected route)
// @acess private
router.get("/profile", protectRoute, async (req, res) => {
    res.json(req.user)
})


module.exports = router