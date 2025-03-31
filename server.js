const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth.js")
const { errorHandler } = require("./middleware/errorHandler.js")

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)

// Error handling middleware
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

