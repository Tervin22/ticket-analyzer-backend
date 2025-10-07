# Ticket Analyzer + Dashboard

A full-stack web application for analyzing IT support tickets, visualizing performance trends, and tracking key metrics like ticket volume, average resolution time, SLA breaches, and technician performance.

## Features

- **Easy Import**: Upload tickets from CSV or Excel files with automatic parsing
- **Visual Analytics**: Interactive charts showing ticket distribution and trends
- **Resolution Tracking**: Monitor average resolution times and identify bottlenecks
- **SLA Compliance**: Track SLA breaches and maintain service standards
- **Team Performance**: Analyze individual technician metrics
- **Trend Analysis**: Identify patterns with historical data

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **shadcn/ui** - UI component library
- **Lucide React** - Icon library

### Backend
- **Node.js + Express** - REST API server
- **Prisma ORM** - Database toolkit
- **SQLite** - Database (easily swappable)
- **Multer** - File upload handling
- **csv-parser & xlsx** - File parsing

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd ticket-analyzer
   \`\`\`

2. **Install frontend dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Install backend dependencies**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   # Generate Prisma Client
   npm run prisma:generate
   
   # Run migrations
   npm run prisma:migrate
   
   # Seed with sample data
   npm run prisma:seed
   \`\`\`

5. **Configure environment variables**
   
   Create `.env` in the backend directory:
   \`\`\`env
   DATABASE_URL="file:./dev.db"
   PORT=3001
   NODE_ENV=development
   \`\`\`
   
   Create `.env.local` in the root directory:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   \`\`\`

### Running the Application

1. **Start the backend server** (in the `backend` directory):
   \`\`\`bash
   npm run dev
   \`\`\`
   The API will run on `http://localhost:3001`

2. **Start the frontend** (in the root directory):
   \`\`\`bash
   npm run dev
   \`\`\`
   The app will run on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Uploading Tickets

1. Navigate to the Upload page
2. Select a CSV or Excel file with your ticket data
3. Click Upload to import the tickets
4. View the results and navigate to the dashboard

### File Format

Your CSV/Excel file should include these columns:

| Column | Description | Required |
|--------|-------------|----------|
| title | Ticket title or subject | Yes |
| category | Ticket category (e.g., Hardware, Software) | Yes |
| priority | Priority level (Low, Medium, High) | Yes |
| status | Current status (Open, In Progress, Resolved, Closed) | Yes |
| technician | Assigned technician name | Yes |
| createdAt | Ticket creation date (ISO format) | Yes |
| resolvedAt | Resolution date (ISO format) | No |
| slaTarget | SLA target in hours | No (default: 24) |
| description | Ticket description | No |

### Sample Data

A sample CSV file is included at `public/sample-tickets.csv` for testing.

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets/upload` - Upload tickets from file
- `GET /api/tickets/analytics` - Get analytics summary
- `GET /api/tickets/by-category` - Get tickets grouped by category
- `GET /api/tickets/technician-performance` - Get technician metrics
- `DELETE /api/tickets/all` - Delete all tickets (testing only)

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL=<your-backend-url>/api`
4. Deploy

### Backend (Railway/Render)

1. Connect your GitHub repository
2. Set environment variables:
   - `DATABASE_URL` (use PostgreSQL for production)
   - `PORT=3001`
   - `NODE_ENV=production`
3. Set build command: `npm install && npx prisma generate && npx prisma migrate deploy`
4. Set start command: `npm start`
5. Deploy

## Project Structure

\`\`\`
ticket-analyzer/
├── app/                      # Next.js app directory
│   ├── dashboard/           # Dashboard page
│   ├── upload/              # Upload page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── backend/                 # Express backend
│   ├── routes/              # API routes
│   ├── utils/               # Utilities (parsers, analytics)
│   ├── server.js            # Express server
│   └── package.json         # Backend dependencies
├── components/              # React components
│   └── ui/                  # shadcn/ui components
├── lib/                     # Utilities
│   ├── api.ts               # API client
│   └── utils.ts             # Helper functions
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma        # Database schema
│   └── seed.js              # Seed script
├── public/                  # Static assets
│   └── sample-tickets.csv   # Sample data
└── package.json             # Frontend dependencies
\`\`\`

## Database Schema

\`\`\`prisma
model Ticket {
  id          Int       @id @default(autoincrement())
  title       String
  category    String
  priority    String
  status      String
  technician  String
  createdAt   DateTime  @default(now())
  resolvedAt  DateTime?
  slaTarget   Int
  slaBreach   Boolean   @default(false)
  description String?
}
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please open an issue on GitHub.
