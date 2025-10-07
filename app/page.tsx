import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Upload, TrendingUp, Clock, CheckCircle2, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Ticket Analyzer + Dashboard
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Powerful analytics for your IT service desk. Upload tickets, visualize trends, and optimize your support
              team's performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/upload">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Tickets
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to analyze and improve your service desk operations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Easy Import</CardTitle>
              <CardDescription>
                Upload tickets from CSV or Excel files with automatic parsing and validation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Visual Analytics</CardTitle>
              <CardDescription>
                Interactive charts and graphs to understand ticket distribution and trends
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Resolution Tracking</CardTitle>
              <CardDescription>
                Monitor average resolution times and identify bottlenecks in your workflow
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>SLA Compliance</CardTitle>
              <CardDescription>Track SLA breaches and maintain high service level standards</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Analyze individual technician metrics and optimize team allocation</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Trend Analysis</CardTitle>
              <CardDescription>
                Identify patterns and forecast future ticket volumes with historical data
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-muted/50 border-y">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Get started in three simple steps</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Upload Your Data</h3>
              <p className="text-muted-foreground text-sm">
                Import your ticket data from CSV or Excel files. Our system automatically parses and validates the data.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Analyze Metrics</h3>
              <p className="text-muted-foreground text-sm">
                View comprehensive analytics including ticket volume, resolution times, and SLA compliance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Optimize Performance</h3>
              <p className="text-muted-foreground text-sm">
                Use insights to improve team efficiency, reduce resolution times, and enhance customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Upload your first batch of tickets and start gaining insights into your service desk performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload Tickets Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/sample-tickets.csv" download>
                Download Sample CSV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
