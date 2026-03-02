const mongoose = require("mongoose")
const bcrpyt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        }, 
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"]
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer"
        }
    }, { timestamps: true }
)

// PASSWORD HASH MIDDLEWARE
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next;
    const salt = await bcrpyt.genSalt(10)
    this.password = await bcrpyt.hash(this.password, salt)
    next
})


// MATCH USER ENTERED PASSWORD WITH HASH PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrpyt.compare(enteredPassword, this.password)

}

module.exports = mongoose.model("User",userSchema)