const express = require("express")
const Order = require("../models/Order")
const Product = require("../models/Product")
const User = require("../models/User")
const Checkout = require("../models/Checkout")
const { protectRoute } = require("../middleware/authMiddleware")

const router = express.Router()


// @route GET /api/orders/my-orders
// @desc Get all orders of user
// @access private

router.get("/my-orders", protectRoute, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(orders)  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
})



// @route GET /api/orders/:id
// @desc Get order details by ID
// @access private

router.get("/:id", protectRoute, async (req, res) => {
    const orderId = req.params.id
    try {
        const order = await Order.findById(orderId).populate("user", "name email")
        if (!order) return res.status(404).json({ message: "Order not found" })

        res.json(order)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
})


module.exports = router