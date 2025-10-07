import express from "express"
import multer from "multer"
import { PrismaClient } from "@prisma/client"
import { parseCSV, parseExcel } from "../utils/fileParser.js"
import { calculateAnalytics } from "../utils/analytics.js"

const router = express.Router()
const prisma = new PrismaClient()
const upload = multer({ dest: "uploads/" })

// Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
    })
    res.json(tickets)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickets", message: error.message })
  }
})

// Upload tickets from CSV or Excel
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const fileExtension = req.file.originalname.split(".").pop().toLowerCase()
    let tickets = []

    if (fileExtension === "csv") {
      tickets = await parseCSV(req.file.path)
    } else if (fileExtension === "xlsx" || fileExtension === "xls") {
      tickets = await parseExcel(req.file.path)
    } else {
      return res.status(400).json({ error: "Unsupported file format. Please upload CSV or Excel file." })
    }

    // Process and save tickets
    const savedTickets = await Promise.all(
      tickets.map(async (ticket) => {
        // Calculate SLA breach
        const slaBreach = ticket.resolvedAt
          ? (new Date(ticket.resolvedAt) - new Date(ticket.createdAt)) / (1000 * 60 * 60) > ticket.slaTarget
          : false

        return prisma.ticket.create({
          data: {
            ...ticket,
            slaBreach,
          },
        })
      }),
    )

    res.json({
      message: "Tickets uploaded successfully",
      count: savedTickets.length,
      tickets: savedTickets,
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to upload tickets", message: error.message })
  }
})

// Get analytics summary
router.get("/analytics", async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany()
    const analytics = calculateAnalytics(tickets)
    res.json(analytics)
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate analytics", message: error.message })
  }
})

// Get tickets by category
router.get("/by-category", async (req, res) => {
  try {
    const tickets = await prisma.ticket.groupBy({
      by: ["category"],
      _count: {
        id: true,
      },
    })
    res.json(tickets)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickets by category", message: error.message })
  }
})

// Get technician performance
router.get("/technician-performance", async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        resolvedAt: { not: null },
      },
    })

    const performance = tickets.reduce((acc, ticket) => {
      if (!acc[ticket.technician]) {
        acc[ticket.technician] = {
          technician: ticket.technician,
          totalTickets: 0,
          resolvedTickets: 0,
          avgResolutionTime: 0,
          slaBreaches: 0,
        }
      }

      acc[ticket.technician].totalTickets++
      if (ticket.resolvedAt) {
        acc[ticket.technician].resolvedTickets++
        const resolutionTime = (new Date(ticket.resolvedAt) - new Date(ticket.createdAt)) / (1000 * 60 * 60)
        acc[ticket.technician].avgResolutionTime += resolutionTime
      }
      if (ticket.slaBreach) {
        acc[ticket.technician].slaBreaches++
      }

      return acc
    }, {})

    // Calculate averages
    Object.values(performance).forEach((tech) => {
      tech.avgResolutionTime = tech.resolvedTickets > 0 ? (tech.avgResolutionTime / tech.resolvedTickets).toFixed(2) : 0
    })

    res.json(Object.values(performance))
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch technician performance", message: error.message })
  }
})

// Delete all tickets (for testing)
router.delete("/all", async (req, res) => {
  try {
    await prisma.ticket.deleteMany()
    res.json({ message: "All tickets deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tickets", message: error.message })
  }
})

export default router
