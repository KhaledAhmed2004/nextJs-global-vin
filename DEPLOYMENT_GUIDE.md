# Next.js Frontend Deployment Guide (Ubuntu Server)

## Prerequisites
- Ubuntu Server (20.04/22.04/24.04)
- SSH access to server
- Node.js 18+ installed on server
- Git installed on server
- GitHub repository with your project

---

## Step 1: Local Machine - Build & Push to GitHub

### 1.1 Build the project locally
```bash
cd /your/project/folder
npm run build
```

### 1.2 Update .gitignore (allow .next folder)
Open `.gitignore` and comment out the `.next` line:
```
# /.next/
```

### 1.3 Push to GitHub
```bash
git add .
git commit -m "add production build"
git push
```

---

## Step 2: Server Setup

### 2.1 Connect to server via SSH
```bash
ssh root@YOUR_SERVER_IP
```

### 2.2 Install Node.js (if not installed)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

### 2.3 Verify installation
```bash
node -v
npm -v
```

---

## Step 3: Deploy Project

### 3.1 Create project folder
```bash
mkdir -p /var/www/your-project-name
cd /var/www/your-project-name
```

### 3.2 Clone from GitHub
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .
```

### 3.3 Install dependencies
```bash
npm install
```

### 3.4 Test run (optional)
```bash
PORT=7500 npm run start
```
Press `Ctrl+C` to stop.

---

## Step 4: Setup PM2 (Process Manager)

### 4.1 Install PM2 globally
```bash
npm install -g pm2
```

### 4.2 Start app with PM2
```bash
PORT=7500 pm2 start npm --name "your-app-name" -- start
```

### 4.3 Check status
```bash
pm2 list
```

### 4.4 Save PM2 config & enable auto-start on reboot
```bash
pm2 save
pm2 startup
```

---

## Step 5: Access Your App

Open browser and go to:
```
http://YOUR_SERVER_IP:7500
```

---

## PM2 Useful Commands

| Command | Description |
|---------|-------------|
| `pm2 list` | Show all running apps |
| `pm2 logs your-app-name` | View app logs |
| `pm2 restart your-app-name` | Restart app |
| `pm2 stop your-app-name` | Stop app |
| `pm2 delete your-app-name` | Remove app from PM2 |
| `pm2 monit` | Real-time monitoring |

---

## Updating the App

### On local machine:
```bash
npm run build
git add .
git commit -m "update build"
git push
```

### On server:
```bash
cd /var/www/your-project-name
git pull
pm2 restart your-app-name
```

---

## Optional: Setup Nginx Reverse Proxy

### Install Nginx
```bash
apt update
apt install nginx
```

### Create config file
```bash
nano /etc/nginx/sites-available/your-app
```

### Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:7500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable the site
```bash
ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## Optional: Setup SSL with Let's Encrypt

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## Troubleshooting

### App not starting?
```bash
pm2 logs your-app-name
```

### Port already in use?
```bash
lsof -i :7500
kill -9 PID_NUMBER
```

### Build failed on server?
Build locally and push `.next` folder to GitHub.

### Check if app is running
```bash
pm2 list
curl http://localhost:7500
```

---

## Quick Reference

| Item | Value |
|------|-------|
| Project Path | `/var/www/your-project-name` |
| Port | 7500 |
| PM2 App Name | your-app-name |
| URL | http://YOUR_SERVER_IP:7500 |

---

**Generated for GlobalVin Project**