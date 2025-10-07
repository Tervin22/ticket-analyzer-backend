# Deployment Guide

This guide covers deploying the Ticket Analyzer application to production.

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier works)

### Steps

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   \`\`\`

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` with your backend URL
   - Example: `https://your-backend.railway.app/api`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

## Backend Deployment (Railway)

### Prerequisites
- GitHub account
- Railway account (free tier available)

### Steps

1. **Prepare for Production**
   
   Update `backend/package.json` scripts:
   \`\`\`json
   {
     "scripts": {
       "start": "node server.js",
       "build": "npx prisma generate && npx prisma migrate deploy"
     }
   }
   \`\`\`

2. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Settings**
   - Set root directory to `backend`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

4. **Add Environment Variables**
   \`\`\`
   DATABASE_URL=<railway-postgres-url>
   PORT=3001
   NODE_ENV=production
   \`\`\`

5. **Add PostgreSQL Database** (Recommended for production)
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will automatically set `DATABASE_URL`

6. **Update Prisma Schema** for PostgreSQL
   \`\`\`prisma
   datasource db {
     provider = "postgresql"  // Changed from sqlite
     url      = env("DATABASE_URL")
   }
   \`\`\`

7. **Deploy**
   - Railway will automatically deploy
   - Your API will be available at the generated URL

## Alternative: Render Deployment

### Backend on Render

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure**
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
   - Start Command: `npm start`

3. **Environment Variables**
   \`\`\`
   DATABASE_URL=<postgres-url>
   PORT=3001
   NODE_ENV=production
   \`\`\`

4. **Add PostgreSQL**
   - Create a new PostgreSQL database in Render
   - Link it to your web service

## Post-Deployment

### Update Frontend Environment
After deploying the backend, update your Vercel environment variable:
\`\`\`
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
\`\`\`

### Test the Application
1. Visit your frontend URL
2. Try uploading the sample CSV
3. Check the dashboard displays correctly
4. Verify all API endpoints work

### Enable CORS (if needed)
The backend already has CORS enabled for all origins. For production, you may want to restrict it:

\`\`\`javascript
// backend/server.js
app.use(cors({
  origin: 'https://your-frontend.vercel.app'
}))
\`\`\`

## Database Migrations

When you update the schema:

\`\`\`bash
# Development
npx prisma migrate dev --name description_of_change

# Production (Railway/Render will run this automatically)
npx prisma migrate deploy
\`\`\`

## Monitoring

### Vercel
- View logs in Vercel dashboard
- Monitor performance and analytics

### Railway/Render
- View logs in the platform dashboard
- Set up alerts for errors
- Monitor database usage

## Troubleshooting

### Frontend can't connect to backend
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend is running
- Check CORS settings

### Database connection errors
- Verify `DATABASE_URL` is set correctly
- Ensure Prisma migrations have run
- Check database is accessible

### File upload issues
- Verify Multer is configured correctly
- Check file size limits
- Ensure uploads directory exists (or use memory storage)

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Restrict origins in production
3. **Rate Limiting**: Add rate limiting to API endpoints
4. **File Upload**: Validate file types and sizes
5. **Database**: Use connection pooling for PostgreSQL
6. **HTTPS**: Both frontend and backend should use HTTPS

## Scaling

### Database
- Upgrade to larger PostgreSQL instance
- Add connection pooling
- Consider read replicas for heavy loads

### Backend
- Railway/Render auto-scale with traffic
- Add caching layer (Redis) for analytics
- Implement background jobs for large file processing

### Frontend
- Vercel automatically handles CDN and edge caching
- Optimize images and assets
- Implement pagination for large datasets
