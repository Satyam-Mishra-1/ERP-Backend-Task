const express = require("express")
const router = express.Router()
const { signup, login, getProfile, updateProfile } = require("../controllers/authController.js")
const { protect } = require("../middleware/auth.js")
const { signupValidator, loginValidator, updateProfileValidator } = require("../middleware/validators.js")

// Public routes
router.post("/signup", signupValidator, signup)
router.post("/login", loginValidator, login)

// Protected routes
router.get("/profile", protect, getProfile)
router.put("/profile", protect, updateProfileValidator, updateProfile)

module.exports = router

