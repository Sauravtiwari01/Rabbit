const express = require("express")
const Subscriber = require("../models/Subscriber")

const router = express.Router()


// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access public
router.post("/subscribe", async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }
    try {
        let subscriber = await Subscriber.findOne({email})

        if (subscriber) {
            return res.status(400).json({ message: "Email already subscribed!" })
        }

        subscriber = new Subscriber({ email })
        await subscriber.save()
        res.status(201).json({ message: "Subscribed to newsletter" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router