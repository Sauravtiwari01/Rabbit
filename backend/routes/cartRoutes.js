const express = require("express")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const { protectRoute } = require("../middleware/authMiddleware")

const router = express.Router()
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId })
    } else if (guestId) {
        return await Cart.findOne({guestId})
    } else
        return null
}
// @route POST /api/cart
// @desc Add a product to a cart for guest & logged in user
// @access Public

router.post("/", async (req, res) => {
    const { productId, quantity, size, color, userId, guestId } = req.body
    try {
        // find product by ID
        const product = await Product.findById(productId)
        if (!product) return res.status(404).json({ message: "Product Not found" })
        // Determine if the user is logged in or Guest
        let cart = await getCart(userId, guestId)

        // if cart exists, update it
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId &&
                    p.size === size && p.color === color)
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                // add to cart
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                })
            }

            // recalculate cart totalprice
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)

            await cart.save()
            return res.status(200).json(cart)
        } else {
            // create new cart for guest or logged in user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                }],
                totalPrice: product.price * quantity
            })
            return res.status(201).json(newCart)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }

})


// @route PUT /api/cart
// @desc Update product quantity for guest & logged in user
// @access Public

router.put("/", async (req, res) => {
    const { productId, quantity, size, color, userId, guestId } = req.body
    try {
        let cart = await getCart(userId, guestId)
        if (!cart) return res.status(404).json({ message: "Cart Not found" })

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId &&
                p.size === size && p.color === color)
        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity
            }
            else {
                cart.products.splice(productIndex, 1)
            }
            // recalculate cart totalprice
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)

            await cart.save()
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({ message: "Product not found in cart " })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }

})


// @route DELETE /api/cart/:id
// @desc Delete a product from cart
// @access public

router.delete("/", async (req, res) => {

    const { productId, size, color, guestId, userId } = req.body
    try {
        let cart = await getCart(userId, guestId)
        if (!cart) return res.status(404).json({ message: "Cart not found" })

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId &&
                p.size === size && p.color === color)
        if (productIndex > -1) {
            cart.products.splice(productIndex, 1)
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
            await cart.save()
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({ message: "product not found in cart" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }


})


// @route GET /api/cart
// @desc Get cart products
// @access public

router.get("/", async (req, res) => {
    const { userId, guestId } = req.query
    try {
        let cart = await getCart(userId, guestId)
        if (!cart) return res.status(404).json({ message: "Cart not found" })

        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })

    }
})


// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access private/user


router.post("/merge",protectRoute, async (req, res) => {
    const { guestId } = req.body
    const { userId } = req.user._id

    try {
        const guestCart = await Cart.findOne({ guestId })
        const userCart = await Cart.findOne({ user: userId })
        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: "No product in guest Cart" })
            }

            if (userCart) {
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                        (p) => p.productId.toString() === guestItem.productId &&
                            p.size === guestItem.size && p.color === guestItem.color)
                    if (productIndex > -1) {
                        userCart.products[productIndex].quantity += guestItem.quantity
                    } else {
                        userCart.products.push(guestItem)
                    }
                })
                userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
                await userCart.save()

                // Remove guest cart
                try {
                    await Cart.findOneAndDelete({ guestId })
                } catch (error) {
                    console.error("Error deleting guest cart", error);
                }
                res.status(200).json(userCart)
            } else {
                // if no existing cart, assign guest cart to user
                guestCart.user = userId
                guestCart.guestId = undefined
                await guestCart.save()
                res.status(200).json(guestCart)
            }
        } else {
            if (userCart) {
                // guest cart already merged
                return res.status(200).json(userCart)
            }
            res.status(404).json({ message: "Guest cart not found" })

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router