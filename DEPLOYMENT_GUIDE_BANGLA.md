# Next.js Frontend Deployment Guide (Banglish)

> Ubuntu Server e Next.js app deploy korar complete guide - protita step er purpose explain kora ache

---

## 🔧 Prerequisites (Age Ki Ki Lagbe ar Keno)

| Item | Keno Lagbe |
|------|------------|
| Ubuntu Server | Tomar app ekhane run hobe 24/7. DigitalOcean, AWS, Linode - jei kono provider hote pare |
| SSH access | Server e remote access korte lagbe. Password ba SSH key diye connect korba |
| Local Node.js | Tomar computer e build korte lagbe, karon server e RAM kom thake |
| GitHub account | Code store ar transfer korte use hobe. Server e direct code pathano mushkil |
| Git Bash | Windows e terminal command run korte lagbe. Mac/Linux e default terminal use korba |

---

## 📁 Step 1: Local Machine e Build Koro

### 🎯 Ei Step er Purpose:
**Problem:** Next.js app production e chalate hole `.next` folder lagbe. Eta build command diye create hoy.

**Keno Local e Build?** Server e normally 1GB RAM thake, kintu build e 2-3GB lage. Tai local machine e build kori jekhane RAM beshi.

---

### 1.1 Project folder e jao

```bash
cd /c/Users/YOUR_USERNAME/path/to/your/project
```

**Example:**
```bash
cd /c/Users/khaled/Downloads/vin/GlobalVin-master
```

**🎯 Keno:** Git Bash ke boltechi project folder e jete. Naile command wrong folder e run hobe.

---

### 1.2 Dependencies install koro

```bash
npm install
```

**🎯 Keno:** `package.json` e ja ja packages lekha ache shob download hobe `node_modules` folder e. Build korar age ei packages lagbe.

**Ki hoy:** `node_modules` folder create hoy ar shob dependencies install hoy.

---

### 1.3 Production build koro

```bash
npm run build
```

**🎯 Keno:**
- Development code ke production-ready code e convert kore
- Code minify (choto) kore - faster loading
- Static pages pre-generate kore
- `.next` folder create kore

**Ki dekha jabe:**
```
Creating an optimized production build...
✓ Compiled successfully
✓ Generating static pages (25/25)
```

**Build fail korle:**
- TypeScript error thakle fix koro
- Import missing thakle add koro
- Error message dekhe bujho ki problem

---

## 📤 Step 2: GitHub e Push Koro

### 🎯 Ei Step er Purpose:
**Problem:** Local machine theke server e file pathate hobe. SCP/SFTP slow ar complicated.

**Solution:** GitHub use kori - local theke GitHub e upload, tarpor server e GitHub theke download. Fast ar easy!

---

### 2.1 .gitignore file edit koro

```bash
notepad .gitignore
```

**🎯 Keno Edit Kortechi:**
- Normally `.next` folder git e push hoy na (ignore list e thake)
- Amra chai `.next` folder o push hok (karon build local e korechi)
- Tai `.next` line ta comment kori

**Change koro:**
```
# Age chilo:
/.next/

# Ekhon eta koro:
# /.next/
```

**Ki hoy:** Git ekhon `.next` folder ke track korbe ar push korbe.

---

### 2.2 Git e add ar commit koro

```bash
git add .
```

**🎯 Keno:** Shob changed files ke "staging area" te add kore. Mane boltechi "ei files gula commit korbo".

```bash
git commit -m "add production build"
```

**🎯 Keno:** Staged files ke save kore ekta message diye. Eta version history te record hoy.

---

### 2.3 GitHub e push koro

```bash
git push
```

**🎯 Keno:** Local commits ke GitHub server e upload kore. Ekhon code online available.

**First time hole:**
```bash
git init                    # Git initialize kore ei folder e
git branch -M main          # Main branch create kore
git remote add origin URL   # GitHub repo link kore
git push -u origin main     # Push kore ar link set kore
```

---

## 🖥️ Step 3: Server e SSH Connect Koro

### 🎯 Ei Step er Purpose:
**Problem:** Server e direct access nai - remote machine, physical access nai.

**Solution:** SSH (Secure Shell) use kori - encrypted connection diye remote terminal access.

---

### 3.1 SSH diye connect koro

```bash
ssh root@YOUR_SERVER_IP
```

**Example:**
```bash
ssh root@142.93.25.130
```

**🎯 Keno:**
- `ssh` = Secure Shell command
- `root` = Server er admin user
- `@` = "at" mane "ei server e"
- `IP` = Server er address

**Ki hoy:** Tumi ekhon server er terminal e acho. Ja command likho ta server e run hobe.

---

### 3.2 Node.js install koro

**Check koro age:**
```bash
node -v
```

**🎯 Keno Check:** Jodi already installed thake abar install korar dorkar nai.

**Install koro (jodi na thake):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

**🎯 Keno:**
- `curl` = URL theke data download kore
- `setup_20.x` = Node.js 20 er setup script
- `bash -` = Script ta run kore
- `apt-get install` = Package manager diye install kore

**Ki hoy:** Node.js ar npm duitai install hoy server e.

---

## 📂 Step 4: Server e Project Deploy Koro

### 🎯 Ei Step er Purpose:
**Problem:** Server e tomar project folder nai - empty machine.

**Solution:** GitHub theke clone kori - shob files ar folders ashe.

---

### 4.1 Project folder create koro

```bash
mkdir -p /var/www/your-project-name
```

**🎯 Keno:**
- `mkdir` = Make Directory (folder create)
- `-p` = Parent directories o create kore (jodi na thake)
- `/var/www/` = Standard location web apps er jonno

**Ki hoy:** Empty folder ready hoy project er jonno.

---

### 4.2 Folder e jao

```bash
cd /var/www/your-project-name
```

**🎯 Keno:** Clone korar age oi folder e thakte hobe.

---

### 4.3 GitHub theke clone koro

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .
```

**🎯 Keno:**
- `git clone` = Repository copy kore
- URL = GitHub repo er link
- `.` = Current folder e clone koro (IMPORTANT!)

**Ki hoy:** Shob files download hoy GitHub theke - source code, `.next` folder, package.json shob.

---

### 4.4 Dependencies install koro

```bash
npm install
```

**🎯 Keno:**
- `node_modules` folder git e push kora hoy na (boro size)
- Server e fresh install korte hoy
- `package.json` dekhe shob packages install kore

**Ki hoy:** `node_modules` folder create hoy shob dependencies diye.

---

## ▶️ Step 5: App Test Koro

### 🎯 Ei Step er Purpose:
**Problem:** Shob setup thik ache kina confirm korte hobe age.

**Solution:** Manually run kori ar browser e check kori.

---

### 5.1 Manually start koro

```bash
PORT=7500 npm run start
```

**🎯 Keno:**
- `PORT=7500` = Ei port e run hobe (default 3000)
- `npm run start` = Production server start kore

**Ki dekha jabe:**
```
▲ Next.js 16.0.1
- Network: http://YOUR_IP:7500
✓ Ready
```

---

### 5.2 Browser e check koro

```
http://YOUR_SERVER_IP:7500
```

**🎯 Keno:** Website load hole mane shob thik ache!

---

### 5.3 Stop koro

`Ctrl + C` press koro.

**🎯 Keno:** Test complete, ekhon proper setup korbo PM2 diye.

---

## 🔄 Step 6: PM2 Setup Koro

### 🎯 Ei Step er Purpose:

**Problem 1:** `npm run start` korar por terminal close korle app o off hoye jay.

**Problem 2:** Server restart hole manually abar start korte hoy.

**Problem 3:** App crash korle automatically restart hoy na.

**Solution:** PM2 - Process Manager jeta:
- Background e app chalaye
- Auto-restart kore crash hole
- Server reboot e automatic start kore
- Logs manage kore

---

### 6.1 PM2 install koro

```bash
npm install -g pm2
```

**🎯 Keno:**
- `-g` = Global install (shob folder theke use korte parba)
- PM2 ekhon system-wide available

---

### 6.2 PM2 diye app start koro

```bash
PORT=7500 pm2 start npm --name "globalvin" -- start
```

**🎯 Keno:**
- `pm2 start` = PM2 diye process start koro
- `npm` = npm command run korbe
- `--name "globalvin"` = Process er naam (identify korte easy)
- `-- start` = npm er argument (npm run start)

**Ki hoy:** App background e start hoy, terminal close korleo chalte thake.

---

### 6.3 Check koro running kina

```bash
pm2 list
```

**🎯 Keno:** Shob PM2 processes er status dekhe.

**Ki dekha jabe:**
```
│ id │ name      │ status │
│ 0  │ globalvin │ online │
```

`online` = Running!

---

### 6.4 Auto-start setup koro

```bash
pm2 save
```

**🎯 Keno:** Current process list save kore. Reboot er por eta restore hobe.

```bash
pm2 startup
```

**🎯 Keno:** System startup e PM2 automatic start korar script install kore.

**Ki hoy:** Server restart hole automatic shob app start hobe.

---

## 📋 PM2 Commands ar Todar Purpose

| Command | Ki Kore | Kokhon Use Korba |
|---------|---------|------------------|
| `pm2 list` | Shob app er status | Check korte chaile app running kina |
| `pm2 logs app-name` | Logs dekhe | Error debug korte, ki hocche dekhte |
| `pm2 restart app-name` | Restart kore | Code update er por, problem hole |
| `pm2 stop app-name` | Stop kore | Temporarily off korte |
| `pm2 delete app-name` | Remove kore | Completely remove korte PM2 theke |
| `pm2 monit` | Live monitoring | Real-time CPU/RAM usage dekhte |

---

## 🔄 Step 7: App Update Korar Process

### 🎯 Ei Step er Purpose:
**Problem:** Code change korle kivabe live site e reflect korbe?

**Solution:** Simple 4-step process.

---

### Local machine e (Git Bash):

```bash
# 1. Project folder e jao
cd /c/Users/YOUR_USERNAME/path/to/project

# 2. Build koro (production build update)
npm run build

# 3. Git e add ar commit
git add .
git commit -m "update: description"

# 4. Push koro
git push
```

**🎯 Keno:**
1. Folder e jete hobe command run korte
2. New build banate hobe new code er
3. Changes save korte hobe git e
4. GitHub e upload korte hobe

---

### Server e (SSH terminal):

```bash
# 1. Project folder e jao
cd /var/www/globalvin

# 2. GitHub theke latest code ano
git pull

# 3. App restart koro new code load korte
pm2 restart globalvin
```

**🎯 Keno:**
1. Correct folder e thakte hobe
2. `git pull` new code download kore
3. PM2 restart korle new code load hoy

---

## 🛠️ Troubleshooting (Problem ar Solution)

### Problem 1: Build fail hocche server e
**Keno hoy:** Server e RAM kom (1GB), build e 2-3GB lage.

**Solution:** Local e build koro, `.next` folder push koro.

---

### Problem 2: "Port already in use" error
**Keno hoy:** Already kono process oi port e running.

**Solution:**
```bash
# Ke use kortese dekho
lsof -i :7500

# Kill koro
kill -9 PID_NUMBER
```

---

### Problem 3: App start hocche na
**Keno hoy:** Code e error, dependencies missing, ba config problem.

**Solution:**
```bash
# Error dekho
pm2 logs globalvin

# Ba manually run koro details dekhte
PORT=7500 npm run start
```

---

### Problem 4: Permission denied
**Keno hoy:** File/folder er owner ba permission wrong.

**Solution:**
```bash
chmod -R 755 /var/www/globalvin
chown -R root:root /var/www/globalvin
```

---

### Problem 5: npm install fail
**Keno hoy:** Cache corrupted ba network issue.

**Solution:**
```bash
npm cache clean --force
npm install
```

---

### Problem 6: Module not found
**Keno hoy:** node_modules corrupt ba incomplete.

**Solution:**
```bash
rm -rf node_modules
npm install
```

---

### Problem 7: Site load hocche na browser e
**Keno hoy:** Firewall port block kortese.

**Solution:**
```bash
ufw allow 7500
ufw reload
```

---

## 🌐 Optional: Nginx Setup

### 🎯 Keno Lagbe:
- Domain use korte chaile (mysite.com)
- Port number chara access korte (`:7500` lekha lagbe na)
- SSL/HTTPS setup korte
- Multiple apps same server e chalate

---

### Install ar Setup:

```bash
# 1. Install Nginx
apt update && apt install nginx -y

# 2. Config file create
nano /etc/nginx/sites-available/globalvin

# 3. Ei config paste koro:
```

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

```bash
# 4. Save: Ctrl+X, Y, Enter

# 5. Enable site
ln -s /etc/nginx/sites-available/globalvin /etc/nginx/sites-enabled/

# 6. Test ar restart
nginx -t
systemctl restart nginx
```

**🎯 Ki hoy:**
- Domain e request asle Nginx receive kore
- Internally port 7500 e forward kore
- User ke port lekha lage na

---

## 🔒 Optional: SSL (HTTPS)

### 🎯 Keno Lagbe:
- Secure connection (data encrypted)
- Browser e padlock icon
- SEO ranking better
- User trust beshi

---

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# SSL setup koro
certbot --nginx -d your-domain.com
```

**🎯 Ki hoy:** Free SSL certificate install hoy, auto-renew hobe.

---

## ✅ Deployment Checklist

| Step | Check | Purpose |
|------|-------|---------|
| Local build | ☐ | Production-ready code create |
| .gitignore edit | ☐ | .next folder push allow |
| Git push | ☐ | GitHub e upload |
| SSH connect | ☐ | Server access |
| Node.js verify | ☐ | Runtime ready |
| Git clone | ☐ | Code download |
| npm install | ☐ | Dependencies ready |
| Test run | ☐ | Verify kaj kortese |
| PM2 start | ☐ | Background run |
| pm2 save | ☐ | Reboot e auto-start |
| Browser check | ☐ | Final verification |

---

## 📊 Quick Reference

| Item | Value | Purpose |
|------|-------|---------|
| SSH Command | `ssh root@IP` | Server e connect |
| Project Path | `/var/www/appname` | Files er location |
| Start Command | `PORT=7500 pm2 start npm --name "app" -- start` | App run |
| Update Command | `git pull && pm2 restart app` | Code update |
| Logs Command | `pm2 logs app` | Debug korte |

---

## 🔑 Key Concepts Summary

| Concept | Ki | Keno Important |
|---------|-----|----------------|
| SSH | Remote terminal access | Server control korte |
| npm build | Production code create | Optimized ar fast |
| Git/GitHub | Version control ar code transfer | Easy deployment |
| PM2 | Process manager | App always running thake |
| Port | Network door number | Different apps different ports |
| Nginx | Reverse proxy | Domain ar SSL handle |

---

**🎉 Congratulations! Tumi ekhon server deployment bujho!**

---

*Last Updated: November 2025*