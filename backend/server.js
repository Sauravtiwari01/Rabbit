const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const checkoutRoutes = require("./routes/checkoutRoutes")
const ordersRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscribeRoutes = require("./routes/subscribeRoutes")
const adminRoutes = require("./routes/adminRoutes")
const productAdminRoutes = require("./routes/productAdminRoutes")
const orderAdminRoutes = require("./routes/orderAdminRoutes")

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

// CONNECT MONGODB DATABASE
connectDB()

app.get("/", (req, res) => {
    res.send("welcome to rabbit api")
})
// USER API ROUTES
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/orders", ordersRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api", subscribeRoutes)

// ADMIN API ROUTES
app.use("/api/admin/users", adminRoutes)
app.use("/api/admin/products", productAdminRoutes)
app.use("/api/admin/orders", orderAdminRoutes)

app.listen(PORT, () => {

    console.log(`server is running on http://localhost:${PORT}`)
})