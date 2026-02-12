# Deployment Guide

## Overview
This guide covers deploying the Financial Suitability Platform to production environments.

## Architecture for Production

```
┌─────────────────┐
│   Frontend      │
│   (React/Vite)  │
│   Static Files  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Backend API   │
│   (Node/Express)│
│   + Gemini API  │
└─────────────────┘
```

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Build frontend:
   ```bash
   cd frontend
   npm run build
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

4. Set environment variable:
   - `VITE_API_URL`: Your backend URL

#### Backend on Railway
1. Create account at [railway.app](https://railway.app)

2. Create new project from GitHub

3. Set environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `PORT`: 3001
   - `NODE_ENV`: production

4. Deploy automatically on push

### Option 2: Single Server (VPS/EC2)

#### Prerequisites
- Ubuntu 22.04+ server
- Node.js 18+
- PM2 for process management
- Nginx for reverse proxy

#### Setup Steps

1. **Install dependencies:**
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx
   sudo npm install -g pm2
   ```

2. **Clone and setup:**
   ```bash
   git clone <repo-url>
   cd financial-suitability-platform
   
   # Backend
   cd backend
   npm install --production
   cp .env.example .env
   # Edit .env with your keys
   
   # Frontend
   cd ../frontend
   npm install
   npm run build
   ```

3. **Start backend with PM2:**
   ```bash
   cd backend
   pm2 start server.js --name financial-backend
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       # Frontend
       location / {
           root /path/to/frontend/dist;
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Enable HTTPS with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

### Option 3: Docker Deployment

#### Dockerfile for Backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
```

#### Dockerfile for Frontend
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - NODE_ENV=production
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

## Environment Variables

### Backend (.env)
```bash
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
NODE_ENV=production
```

### Frontend (build time)
```bash
VITE_API_URL=https://api.yourdomain.com
```

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set up rate limiting on API endpoints
- [ ] Implement CORS properly (not allow all origins)
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Set up monitoring and logging
- [ ] Implement proper error handling
- [ ] Add input validation and sanitization
- [ ] Set up backup for critical data

## Monitoring

### Recommended Tools
- **Application**: PM2 monitoring, New Relic, or Datadog
- **Server**: Prometheus + Grafana
- **Errors**: Sentry
- **Uptime**: UptimeRobot or Pingdom

### Key Metrics to Track
- API response times
- Error rates
- Gemini API usage/costs
- User engagement (profiles analyzed)
- Server resources (CPU, memory)

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, AWS ELB)
- Stateless backend design (already implemented)
- Session management if needed
- Database for user data (future)

### Vertical Scaling
- Start with 1-2 GB RAM server
- Scale based on traffic
- Consider serverless for cost optimization

## Cost Optimization

### Gemini API
- Use caching for common queries
- Implement request batching
- Set up usage alerts
- Consider rate limiting

### Infrastructure
- Start small, scale on demand
- Use CDN for frontend assets
- Optimize images and assets
- Enable gzip compression

## Backup Strategy

### What to Backup
- Environment configuration
- User data (when implemented)
- Scheme database updates
- Application logs

### Backup Schedule
- Daily: Critical data
- Weekly: Full backup
- Monthly: Long-term archive

## Rollback Plan

1. Keep previous version tagged in Git
2. PM2 allows easy restart to previous version
3. Database migrations should be reversible
4. Keep old Docker images

## Post-Deployment Checklist

- [ ] SSL certificate installed and working
- [ ] All environment variables set correctly
- [ ] API endpoints responding correctly
- [ ] Frontend loading and functional
- [ ] Error tracking configured
- [ ] Monitoring dashboards set up
- [ ] Backup system running
- [ ] Domain DNS configured
- [ ] CDN configured (if using)
- [ ] Load testing completed
- [ ] Security audit performed

## Troubleshooting

### Backend won't start
- Check GEMINI_API_KEY is set
- Verify PORT is not in use
- Check Node.js version (18+)
- Review logs: `pm2 logs`

### Frontend can't connect to API
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Ensure API is running and accessible
- Check browser console for errors

### High Gemini API costs
- Implement caching layer
- Review prompt efficiency
- Set up rate limiting
- Monitor usage patterns

## Support

For deployment issues:
- Check logs first: `pm2 logs` or Docker logs
- Review error tracking dashboard
- Contact support with error details
- Check GitHub issues for known problems
