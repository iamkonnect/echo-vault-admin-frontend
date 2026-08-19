# 🚀 VPS Deployment Guide

## Quick Deploy (3 Commands)

```bash
# SSH to VPS
ssh root@187.124.116.216

# Create network (if needed) and deployment directory
docker network inspect echo-vault-network > /dev/null 2>&1 || docker network create echo-vault-network
mkdir -p /opt/echo-vault-admin-frontend && cd /opt/echo-vault-admin-frontend

# Get docker-compose and deploy
curl -o docker-compose.yml https://raw.githubusercontent.com/iamkonnect/echo-vault-admin-frontend/main/docker-compose.yml
docker-compose up -d
```

**Done!** Visit `https://admin.echovaultz.com`

---

## Detailed Setup

### Prerequisites

- Docker & Docker Compose installed
- Traefik running with SSL certificates
- `echo-vault-network` Docker network exists
- DNS pointing `admin.echovaultz.com` to VPS IP

### Step 1: Create Network

```bash
docker network inspect echo-vault-network > /dev/null 2>&1 || \
    docker network create echo-vault-network
```

### Step 2: Setup Deployment Directory

```bash
mkdir -p /opt/echo-vault-admin-frontend
cd /opt/echo-vault-admin-frontend
```

### Step 3: Get Docker Compose File

```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/iamkonnect/echo-vault-admin-frontend/main/docker-compose.yml
```

Or create manually:

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  admin:
    image: iamkonnect/echo-vault-admin-frontend:latest
    container_name: echo-vault-admin-frontend
    expose:
      - "3000"
    labels:
      - traefik.enable=true
      - traefik.http.routers.admin-frontend.rule=Host(`admin.echovaultz.com`)
      - traefik.http.routers.admin-frontend.entrypoints=websecure
      - traefik.http.routers.admin-frontend.tls=true
      - traefik.http.services.admin-frontend.loadbalancer.server.port=3000
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 10s
    restart: unless-stopped
    networks:
      - echo-vault-network

networks:
  echo-vault-network:
    external: true
EOF
```

### Step 4: Start Service

```bash
docker-compose up -d
```

### Step 5: Verify Deployment

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs admin

# Test health check
curl -I http://localhost:3000/

# Test Traefik routing
curl -I https://admin.echovaultz.com/
```

---

## Verification Checklist

- [ ] Container is running: `docker ps | grep echo-vault-admin-frontend`
- [ ] Port 3000 is listening: `curl -I http://localhost:3000/`
- [ ] Traefik routing works: `curl -I https://admin.echovaultz.com/`
- [ ] Health check passing: `docker-compose ps` shows "healthy"
- [ ] Logs show no errors: `docker-compose logs admin`
- [ ] Can login at `https://admin.echovaultz.com`

---

## Login Test

```
URL: https://admin.echovaultz.com

ADMIN LOGIN:
Email:    akwera@echovaultz.com
Password: [your admin password]

ARTIST LOGIN:
Email:    artist@gmail.com
Password: [your artist password]
```

---

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs admin

# Common issues:
# - Port 3000 already in use
# - Network doesn't exist
# - Image not found (pull it first: docker pull iamkonnect/echo-vault-admin-frontend:latest)
```

### Can't reach admin.echovaultz.com

```bash
# Check DNS
nslookup admin.echovaultz.com

# Check Traefik
docker logs traefik | grep admin-frontend

# Check container network
docker inspect echo-vault-admin-frontend | grep -A 10 Networks
```

### Health check failing

```bash
# Test directly
docker exec echo-vault-admin-frontend wget -q -O - http://localhost:3000/

# Check nginx
docker exec echo-vault-admin-frontend curl -I http://localhost:3000/
```

### Login fails

```bash
# Check backend API is accessible
curl -I https://api.echovaultz.com/api

# Check browser console for CORS errors (F12)

# Test from container
docker exec echo-vault-admin-frontend curl -I https://api.echovaultz.com/api
```

---

## Updating the Service

### Pull Latest Image

```bash
docker pull iamkonnect/echo-vault-admin-frontend:latest
docker-compose restart
```

### Rebuild from Source (if you made changes)

```bash
cd /opt/echo-vault-admin-frontend

# Get latest code
git clone https://github.com/iamkonnect/echo-vault-admin-frontend.git code
cd code

# Build
npm install
npm run build

# Build Docker image
docker build -t iamkonnect/echo-vault-admin-frontend:latest .

# Push to Docker Hub (optional, if you have permissions)
docker push iamkonnect/echo-vault-admin-frontend:latest

# Deploy
cd /opt/echo-vault-admin-frontend
docker-compose down
docker-compose up -d
```

---

## Monitoring

### View Logs

```bash
# Real-time logs
docker-compose logs -f admin

# Last 50 lines
docker-compose logs --tail=50 admin
```

### Check Health

```bash
# Container health
docker inspect echo-vault-admin-frontend | grep -A 5 '"Health"'

# Service status
docker-compose ps

# Network connectivity
docker exec echo-vault-admin-frontend ping -c 1 api.echovaultz.com
```

---

## Maintenance

### Stop Service

```bash
docker-compose stop
```

### Start Service

```bash
docker-compose start
```

### Restart Service

```bash
docker-compose restart
```

### Remove Service

```bash
docker-compose down
docker rmi iamkonnect/echo-vault-admin-frontend:latest
```

---

## Backup & Restore

### Backup Configuration

```bash
cp -r /opt/echo-vault-admin-frontend /backup/echo-vault-admin-frontend.backup
```

### Restore Configuration

```bash
cp -r /backup/echo-vault-admin-frontend.backup /opt/echo-vault-admin-frontend
docker-compose up -d
```

---

## Support & Issues

- **GitHub:** https://github.com/iamkonnect/echo-vault-admin-frontend
- **Docker Hub:** https://hub.docker.com/r/iamkonnect/echo-vault-admin-frontend
- **API Backend:** https://api.echovaultz.com/api

---

**Deployment Status: ✅ READY**
