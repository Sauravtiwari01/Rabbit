const express = require("express")
const Product = require("../models/Product")
const { protectRoute, admin } = require("../middleware/authMiddleware")



const router = express.Router()

// @route GET /api/admin/products
// @desc Get all products
// @access private/admin

router.get("/", protectRoute, admin, async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 })
        if (!products) {
            return res.status(400).json({ message: "Products not found" })
        }

        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
})

router.put("/:id", protectRoute, admin, async (req, res) => {

    try {
        const { name,
            description,
            price,
            discountedPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } = req.body

        const product = await Product.findById(req.params.id)

        if (product) {
            product.name = name || product.name,
                product.description = description || product.description,
                product.price = price || product.price,
                product.discountedPrice = discountedPrice || product.discountedPrice,
                product.countInStock = countInStock || product.countInStock,
                product.category = category || product.category,
                product.brand = brand || product.brand,
                product.sizes = sizes || product.sizes,
                product.colors = colors || product.colors,
                product.collections = collections || product.collections,
                product.material = material || product.material,
                product.gender = gender || product.gender,
                product.images = images || product.images,
                product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured,
                product.isPublished = isPublished !== undefined ? isPublished : product.isPublished,
                product.tags = tags || product.tags,
                product.dimensions = dimensions || product.dimensions,
                product.weight = weight || product.weight,
                product.sku = sku || product.sku

            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404).json({ message: "Product Not Found" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })

    }

})


module.exports = router