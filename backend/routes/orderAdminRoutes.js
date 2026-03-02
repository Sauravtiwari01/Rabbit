const express = require("express")
const Order = require("../models/Order")
const { protectRoute, admin } = require("../middleware/authMiddleware")



const router = express.Router()

// @route GET /api/admin/orders
// @desc Get all orders
// @access private/admin


router.get("/", protectRoute, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate("user", "name email")
        if (!orders) return res.status(404).json({ message: "Orders not found" })

        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
})



// @route PUT /api/admin/orders/:id
// @desc Update order details
// @access private/admin

router.put("/:id", protectRoute, admin, async (req, res) => {

    try {
        const order = await Order.findById(req.params.id).populate("user", "name email")
        if (order) {
            order.status = req.body.status || order.status,
                order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered,
                order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt

            const updatedOrder = await order.save()
            res.status(200).json({ message: "Order updated", Order: updatedOrder })
        } else {
            return res.status(404).json({ message: "Order not found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })

    }
})



// @route DELETE /api/admin/orders/:id
// @desc Delete order
// @access private/admin

router.delete("/:id", protectRoute, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            await order.deleteOne()
            res.json({ message: "Order deleted successfully" })
        } else {
            return res.status(404).json({ message: "Order not found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })

    }
})

module.exports = router