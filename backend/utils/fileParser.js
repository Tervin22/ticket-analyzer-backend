import fs from "fs"
import csv from "csv-parser"
import xlsx from "xlsx"

export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const tickets = []

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        tickets.push({
          title: row.title || row.Title,
          category: row.category || row.Category,
          priority: row.priority || row.Priority,
          status: row.status || row.Status,
          technician: row.technician || row.Technician,
          createdAt: new Date(row.createdAt || row.CreatedAt || row.created_at),
          resolvedAt:
            row.resolvedAt || row.ResolvedAt || row.resolved_at
              ? new Date(row.resolvedAt || row.ResolvedAt || row.resolved_at)
              : null,
          slaTarget: Number.parseInt(row.slaTarget || row.SLATarget || row.sla_target || 24),
          description: row.description || row.Description || "",
        })
      })
      .on("end", () => {
        fs.unlinkSync(filePath) // Clean up uploaded file
        resolve(tickets)
      })
      .on("error", (error) => {
        reject(error)
      })
  })
}

export const parseExcel = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const data = xlsx.utils.sheet_to_json(worksheet)

    const tickets = data.map((row) => ({
      title: row.title || row.Title,
      category: row.category || row.Category,
      priority: row.priority || row.Priority,
      status: row.status || row.Status,
      technician: row.technician || row.Technician,
      createdAt: new Date(row.createdAt || row.CreatedAt || row.created_at),
      resolvedAt:
        row.resolvedAt || row.ResolvedAt || row.resolved_at
          ? new Date(row.resolvedAt || row.ResolvedAt || row.resolved_at)
          : null,
      slaTarget: Number.parseInt(row.slaTarget || row.SLATarget || row.sla_target || 24),
      description: row.description || row.Description || "",
    }))

    fs.unlinkSync(filePath) // Clean up uploaded file
    return tickets
  } catch (error) {
    throw new Error(`Failed to parse Excel file: ${error.message}`)
  }
}
