const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, phone, profilePicture } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" })
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone: phone || "",
      profilePicture: profilePicture || "",
    })

    if (user) {
      res.status(201).json({ message: "User created successfully" })
    } else {
      res.status(400).json({ error: "Invalid user data" })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({ token })
  } catch (error) {
    next(error)
  }
}

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      profilePicture: user.profilePicture,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const { name, email, phone, profilePicture, password } = req.body

    // Check if email is already taken by another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email })
      if (emailExists) {
        return res.status(400).json({ error: "Email already in use" })
      }
    }

    // Update user fields
    if (name) user.name = name
    if (email) user.email = email
    if (phone) user.phone = phone
    if (profilePicture) user.profilePicture = profilePicture

    // Update password if provided
    if (password) {
      user.password = password
    }

    await user.save()

    res.json({ message: "Profile updated successfully" })
  } catch (error) {
    next(error)
  }
}

