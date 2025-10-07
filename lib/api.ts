const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export const api = {
  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`)
    return response.json()
  },

  // Get all tickets
  async getTickets() {
    const response = await fetch(`${API_BASE_URL}/tickets`)
    if (!response.ok) throw new Error("Failed to fetch tickets")
    return response.json()
  },

  // Upload tickets file
  async uploadTickets(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${API_BASE_URL}/tickets/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to upload tickets")
    }

    return response.json()
  },

  // Get analytics
  async getAnalytics() {
    const response = await fetch(`${API_BASE_URL}/tickets/analytics`)
    if (!response.ok) throw new Error("Failed to fetch analytics")
    return response.json()
  },

  // Get tickets by category
  async getTicketsByCategory() {
    const response = await fetch(`${API_BASE_URL}/tickets/by-category`)
    if (!response.ok) throw new Error("Failed to fetch tickets by category")
    return response.json()
  },

  // Get technician performance
  async getTechnicianPerformance() {
    const response = await fetch(`${API_BASE_URL}/tickets/technician-performance`)
    if (!response.ok) throw new Error("Failed to fetch technician performance")
    return response.json()
  },

  // Delete all tickets
  async deleteAllTickets() {
    const response = await fetch(`${API_BASE_URL}/tickets/all`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete tickets")
    return response.json()
  },
}
