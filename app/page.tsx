"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { api } from "@/lib/api"
import Link from "next/link"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<{
    success: boolean
    message: string
    count?: number
  } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const validateFile = (selectedFile: File) => {
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase()
    if (fileExtension === "csv" || fileExtension === "xlsx" || fileExtension === "xls") {
      setFile(selectedFile)
      setUploadResult(null)
      return true
    } else {
      setUploadResult({
        success: false,
        message: "Please select a CSV or Excel file (.csv, .xlsx, .xls)",
      })
      return false
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      validateFile(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      validateFile(droppedFile)
    }
  }

  const handleClickUpload = () => {
    const fileInput = document.getElementById("file-upload") as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadResult(null)

    try {
      const result = await api.uploadTickets(file)
      setUploadResult({
        success: true,
        message: result.message,
        count: result.count,
      })
      setFile(null)
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      setUploadResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to upload file",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Upload Tickets</h1>
          <p className="text-muted-foreground">Import your service desk tickets from CSV or Excel files</p>
        </div>

        <div className="grid gap-6 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>
                Upload a CSV or Excel file containing your ticket data. The file should include columns for title,
                category, priority, status, technician, createdAt, and optionally resolvedAt and slaTarget.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClickUpload}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                  isDragging
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-border hover:border-primary/50 hover:bg-accent/5"
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <FileSpreadsheet className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-primary hover:text-primary/80 font-medium">
                      {isDragging ? "Drop file here" : "Click to choose a file"}
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="text-sm text-muted-foreground mt-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">CSV, XLSX, or XLS files only</p>
                </div>
              </div>

              {file && (
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <Button onClick={handleUpload} disabled={uploading}>
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              )}

              {uploadResult && (
                <Alert variant={uploadResult.success ? "default" : "destructive"}>
                  {uploadResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertDescription>
                    {uploadResult.message}
                    {uploadResult.count && ` (${uploadResult.count} tickets imported)`}
                  </AlertDescription>
                </Alert>
              )}

              {uploadResult?.success && (
                <div className="flex justify-center">
                  <Button asChild>
                    <Link href="/dashboard">View Dashboard</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>File Format Requirements</CardTitle>
              <CardDescription>Your file should contain the following columns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Column Name</div>
                  <div className="font-medium">Description</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2 py-2 border-t">
                    <div className="text-muted-foreground">title</div>
                    <div>Ticket title or subject</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-t">
                    <div className="text-muted-foreground">category</div>
                    <div>Ticket category (e.g., Hardware, Software)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-t">
                    <div className="text-muted-foreground">priority</div>
                    <div>Priority level (Low, Medium, High)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-t">
                    <div className="text-muted-foreground">status</div>
                    <div>Current status (Open, In Progress, Resolved, Closed)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-t">
                    <div className="text-muted-foreground">technician</div>
                    <div>Assigned technician name</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-t">
                    <div className="text-muted-foreground">createdAt</div>
                    <div>Ticket creation date (ISO format)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-t">
                    <div className="text-muted-foreground">resolvedAt</div>
                    <div>Resolution date (optional, ISO format)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-t">
                    <div className="text-muted-foreground">slaTarget</div>
                    <div>SLA target in hours (optional, default: 24)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

