export const calculateAnalytics = (tickets) => {
  const totalTickets = tickets.length

  // Tickets by status
  const statusCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1
    return acc
  }, {})

  // Tickets by category
  const categoryCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1
    return acc
  }, {})

  // Tickets by priority
  const priorityCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.priority] = (acc[ticket.priority] || 0) + 1
    return acc
  }, {})

  // Calculate average resolution time
  const resolvedTickets = tickets.filter((t) => t.resolvedAt)
  const totalResolutionTime = resolvedTickets.reduce((sum, ticket) => {
    const resolutionTime = (new Date(ticket.resolvedAt) - new Date(ticket.createdAt)) / (1000 * 60 * 60)
    return sum + resolutionTime
  }, 0)
  const avgResolutionTime = resolvedTickets.length > 0 ? (totalResolutionTime / resolvedTickets.length).toFixed(2) : 0

  // SLA compliance
  const slaBreaches = tickets.filter((t) => t.slaBreach).length
  const slaCompliance = totalTickets > 0 ? (((totalTickets - slaBreaches) / totalTickets) * 100).toFixed(2) : 100

  // Tickets over time (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const ticketsOverTime = tickets
    .filter((t) => new Date(t.createdAt) >= thirtyDaysAgo)
    .reduce((acc, ticket) => {
      const date = new Date(ticket.createdAt).toISOString().split("T")[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

  return {
    summary: {
      totalTickets,
      openTickets: statusCounts["Open"] || 0,
      inProgressTickets: statusCounts["In Progress"] || 0,
      resolvedTickets: statusCounts["Resolved"] || 0,
      closedTickets: statusCounts["Closed"] || 0,
      avgResolutionTime: Number.parseFloat(avgResolutionTime),
      slaCompliance: Number.parseFloat(slaCompliance),
      slaBreaches,
    },
    byCategory: Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
    })),
    byPriority: Object.entries(priorityCounts).map(([priority, count]) => ({
      priority,
      count,
    })),
    byStatus: Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    })),
    ticketsOverTime: Object.entries(ticketsOverTime)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)),
  }
}
