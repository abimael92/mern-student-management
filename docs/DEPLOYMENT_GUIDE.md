# Deployment Guide – School Management System

This guide covers local development setup and a reference production deployment on AWS (MongoDB Atlas + EC2 + S3 + Nginx + PM2).

---

## 1. Local Development

### 1.1 Clone the repository

```bash
git clone https://github.com/your-org/school-management.git
cd school-management
```

### 1.2 Backend setup

```bash
cd backend
npm install
cp ../.env.example .env
# Edit .env with your local values (Mongo URI, JWT secrets, AWS keys, etc.)
```

Seed the database:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

By default, the API listens on `http://localhost:5000`.

### 1.3 Frontend setup

In another terminal:

```bash
cd frontend
npm install
cp ../.env.example .env
```

Ensure `VITE_API_URL=http://localhost:5000/api` in `frontend/.env`.

Start Vite dev server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 2. Production Deployment (MongoDB Atlas + AWS)

### 2.1 MongoDB Atlas

1. Create a MongoDB Atlas account and cluster.
2. Create a database named `schoolManagement` (or your preferred name).
3. Create a database user with a strong password.
4. Configure IP access:
   - Allow your EC2 instance IP or VPC peering.
5. Note the connection string:

```text
mongodb+srv://<user>:<password>@<cluster>/<dbName>?retryWrites=true&w=majority
```

Use this as `MONGO_URI` in production.

### 2.2 AWS S3 for uploads

1. Create an S3 bucket (e.g., `school-management-uploads`):
   - Region: `us-east-1` or your choice.
2. Configure:
   - Keep bucket **private**.
   - Use pre-signed URLs for downloads.
3. Create an IAM user or role with minimal S3 permissions for this bucket:
   - `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`.
4. Store credentials as environment variables:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `AWS_BUCKET_NAME`

### 2.3 EC2 instance setup

1. Launch an EC2 instance (Ubuntu LTS recommended).
2. Install Node.js (LTS), Git, and build tools:

```bash
sudo apt update
sudo apt install -y build-essential git
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

3. Clone the repo on the instance:

```bash
git clone https://github.com/your-org/school-management.git
cd school-management
```

4. Install backend and frontend:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2.4 Environment variables (production)

On EC2 (or via AWS SSM / Secrets Manager), configure:

- `MONGO_URI` (Atlas connection string).
- `PORT=5000` (or your port).
- `JWT_SECRET` and `JWT_REFRESH_SECRET` (long random strings).
- AWS S3 config.
- `CLIENT_ORIGIN` (e.g., `https://school.yourdomain.com`).

For PM2, you can create an ecosystem file or use `.env` loaded via `dotenv`.

### 2.5 Build frontend for production

On EC2:

```bash
cd frontend
npm run build
```

This creates a static bundle in `frontend/dist`. You can:

- Serve it from the backend (already supported in `server.js`), or
- Upload it to an S3 static site + CloudFront (optional).

### 2.6 Start backend with PM2

Install PM2 globally:

```bash
sudo npm install -g pm2
```

From the `backend` directory:

```bash
pm2 start server.js --name school-api
pm2 save
pm2 startup
```

This keeps the Node process running and restarts it on reboot.

### 2.7 Nginx reverse proxy

Install Nginx:

```bash
sudo apt install -y nginx
```

Create a new server block, e.g. `/etc/nginx/sites-available/school.conf`:

```nginx
server {
    listen 80;
    server_name school.yourdomain.com;

    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/school-frontend; # or point to frontend/dist
        try_files $uri /index.html;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/school.conf /etc/nginx/sites-enabled/school.conf
sudo nginx -t
sudo systemctl reload nginx
```

Point `/var/www/school-frontend` to your built frontend (`frontend/dist`), e.g.:

```bash
sudo mkdir -p /var/www/school-frontend
sudo cp -r frontend/dist/* /var/www/school-frontend
```

### 2.8 SSL certificates

Use Let’s Encrypt (Certbot) to secure your site:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d school.yourdomain.com
```

Certbot will:

- Obtain a certificate.
- Update the Nginx config to redirect HTTP to HTTPS.

Ensure `secure: true` is set on cookies in production (NODE_ENV=production).

---

## 3. Backup and Disaster Recovery

- Use the provided `BACKUP_SCRIPT.js` (see file) as a starting point to:
  - Export MongoDB collections.
  - Zip uploads.
  - Upload to a backup bucket.
  - Rotate backups (keep last 7 days).
- Schedule via `cron` or AWS EventBridge/Lambda.

---

## 4. Monitoring and Logging

See `MONITORING.md` for:

- Log aggregation (CloudWatch/ELK).
- Error tracking (Sentry).
- Performance monitoring (APM).
- Uptime checks and alerting.

