import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const sampleTickets = [
  {
    title: "Cannot access email",
    category: "Email",
    priority: "High",
    status: "Resolved",
    technician: "John Smith",
    createdAt: new Date("2025-01-05T09:00:00"),
    resolvedAt: new Date("2025-01-05T11:30:00"),
    slaTarget: 24,
    slaBreach: false,
    description: "User unable to access Outlook email account",
  },
  {
    title: "Printer not working",
    category: "Hardware",
    priority: "Medium",
    status: "Resolved",
    technician: "Sarah Johnson",
    createdAt: new Date("2025-01-06T10:15:00"),
    resolvedAt: new Date("2025-01-07T14:00:00"),
    slaTarget: 24,
    slaBreach: true,
    description: "Office printer HP LaserJet not responding",
  },
  {
    title: "Software installation request",
    category: "Software",
    priority: "Low",
    status: "Open",
    technician: "Mike Davis",
    createdAt: new Date("2025-01-08T08:30:00"),
    resolvedAt: null,
    slaTarget: 48,
    slaBreach: false,
    description: "Need Adobe Creative Suite installed",
  },
  {
    title: "Network connectivity issue",
    category: "Network",
    priority: "High",
    status: "In Progress",
    technician: "John Smith",
    createdAt: new Date("2025-01-09T13:00:00"),
    resolvedAt: null,
    slaTarget: 4,
    slaBreach: false,
    description: "Unable to connect to company VPN",
  },
  {
    title: "Password reset",
    category: "Account",
    priority: "High",
    status: "Resolved",
    technician: "Sarah Johnson",
    createdAt: new Date("2025-01-10T09:45:00"),
    resolvedAt: new Date("2025-01-10T10:00:00"),
    slaTarget: 2,
    slaBreach: false,
    description: "User forgot Active Directory password",
  },
  {
    title: "Laptop running slow",
    category: "Hardware",
    priority: "Medium",
    status: "Resolved",
    technician: "Mike Davis",
    createdAt: new Date("2025-01-11T11:00:00"),
    resolvedAt: new Date("2025-01-12T16:30:00"),
    slaTarget: 24,
    slaBreach: true,
    description: "Dell laptop performance degradation",
  },
  {
    title: "Access to shared drive",
    category: "Access",
    priority: "Medium",
    status: "Closed",
    technician: "John Smith",
    createdAt: new Date("2025-01-12T14:20:00"),
    resolvedAt: new Date("2025-01-12T15:00:00"),
    slaTarget: 8,
    slaBreach: false,
    description: "Need permissions for finance shared folder",
  },
  {
    title: "Application crash",
    category: "Software",
    priority: "High",
    status: "In Progress",
    technician: "Sarah Johnson",
    createdAt: new Date("2025-01-13T10:00:00"),
    resolvedAt: null,
    slaTarget: 4,
    slaBreach: false,
    description: "CRM application crashes on startup",
  },
  {
    title: "New user setup",
    category: "Account",
    priority: "Medium",
    status: "Open",
    technician: "Mike Davis",
    createdAt: new Date("2025-01-14T08:00:00"),
    resolvedAt: null,
    slaTarget: 24,
    slaBreach: false,
    description: "Setup accounts for new employee",
  },
  {
    title: "Monitor display issues",
    category: "Hardware",
    priority: "Low",
    status: "Resolved",
    technician: "John Smith",
    createdAt: new Date("2025-01-15T12:30:00"),
    resolvedAt: new Date("2025-01-15T14:00:00"),
    slaTarget: 48,
    slaBreach: false,
    description: "External monitor flickering",
  },
]

async function main() {
  console.log("Start seeding...")

  // Clear existing tickets
  await prisma.ticket.deleteMany()

  // Create sample tickets
  for (const ticket of sampleTickets) {
    await prisma.ticket.create({
      data: ticket,
    })
  }

  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
