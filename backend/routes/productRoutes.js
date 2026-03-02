const express = require("express")
const { protectRoute, admin } = require("../middleware/authMiddleware")
const Product = require("../models/Product")

const router = express.Router()

// @route POST /api/products
// @desc Create a new product
// @access private/admin

router.post("/", protectRoute, admin, async (req, res) => {

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

        const product = new Product({
            name,
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
            sku,
            user: req.user._id //reference to adminuser id
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })

    }
})

// @route PUT /api/products/:id
// @desc Update an existing product
// @access private/admin

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


// @route DELETE /api/products/:id
// @desc DELETE an existing product
// @access private/admin

router.delete("/:id", protectRoute, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            await product.deleteOne()
            res.json({ message: "Product removed" })
        } else {
            res.status(404).json({ message: "Product Not Found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })

    }
})



// @route GET /api/products/
// @desc Get products with optional query filters
// @access Public

router.get("/", async (req, res) => {
    try {
        const { collection,
            size, color,
            gender,
            minPrice, maxPrice, sortBy,
            search, category, material, brand,
            limit } = req.query

        let query = {}

        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection
        }
        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category
        }
        if (material) {
            query.material = { $in: material.split(",") }
        }
        if (brand) {
            query.brand = { $in: brand.split(",") }
        }
        if (size) {
            query.sizes = { $in: size.split(",") }
        }
        if (color) {
            query.colors = { $in: [color] }
        }
        if (gender) {
            query.gender = gender
        }
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = Number(minPrice)
            if (maxPrice) query.price.$lte = Number(maxPrice)
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        }
        let sort = {}
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 }
                    break;
                case "priceDesc":
                    sort = { price: -1 }
                    break;
                case "popularity":
                    sort = { rating: -1 }
                    break;

                default:
                    break;
            }
        }


        // fetch products from DB and apply sort & filters
        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0)
        res.json(products)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
})





// @route GET /api/products/best-seller
// @desc Retrieve product with highest rating
// @access Public

router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 })
        if (bestSeller) {
            res.json(bestSeller)
        } else {
            res.status(404).json({ message: "Product Not Found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
})



// @route GET /api/products/new-arrivals
// @desc Get New Arrival products 
// @access Public


router.get("/new-arrivals", async (req, res) => {

    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8)
        if (!newArrivals) return res.status(401).json({ message: "Error Fetching new arrivals" })

        res.json(newArrivals)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
})



// @route GET /api/products/:id
// @desc Get single product with ID
// @access Public

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ message: "Product Not Found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
})



// @route GET /api/products/similar/:id
// @desc Get similar products based on product's gender and category
// @access Public

router.get("/similar/:id", async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }

        const similarProducts = await Product.find(
            {
                _id: { $ne: id },
                gender: product.gender,
                category: product.category
            }).limit(4)
        res.json(similarProducts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
})





module.exports = router