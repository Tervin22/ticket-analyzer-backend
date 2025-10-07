import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import ticketRoutes from "./routes/tickets.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/tickets", ticketRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Ticket Analyzer API is running" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
