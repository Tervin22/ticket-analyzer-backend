# Ticket Analyzer Backend

Backend API for the Ticket Analyzer Dashboard application.

## Setup Instructions

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Generate Prisma Client:
\`\`\`bash
npm run prisma:generate
\`\`\`

3. Run database migrations:
\`\`\`bash
npm run prisma:migrate
\`\`\`

4. Seed the database with sample data:
\`\`\`bash
npm run prisma:seed
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The API will be available at `http://localhost:3001`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets/upload` - Upload tickets from CSV/Excel
- `GET /api/tickets/analytics` - Get analytics summary
- `GET /api/tickets/by-category` - Get tickets grouped by category
- `GET /api/tickets/technician-performance` - Get technician performance metrics
- `DELETE /api/tickets/all` - Delete all tickets (testing only)

## Environment Variables

Create a `.env` file in the backend directory:

\`\`\`
DATABASE_URL="file:./dev.db"
PORT=3001
NODE_ENV=development
\`\`\`

## Deployment

### Railway/Render

1. Connect your GitHub repository
2. Set environment variables
3. Add build command: `npm install && npx prisma generate && npx prisma migrate deploy`
4. Add start command: `npm start`
