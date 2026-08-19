# 🏗️ Architecture & Technical Details

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                            │
│                  https://admin.echovaultz.com                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    HTTPS (Let's Encrypt)
                             │
                             ↓
        ┌────────────────────────────────────┐
        │    Traefik Reverse Proxy           │
        │    (Containerized Load Balancer)   │
        │    - SSL/TLS Termination           │
        │    - Host-based routing            │
        │    - Service discovery            │
        └────────────────────┬───────────────┘
                             │
                        Port :3000
                             │
                             ↓
        ┌────────────────────────────────────┐
        │  echo-vault-admin-frontend         │
        │  (Docker Container)                │
        │  ├─ Nginx (Reverse Proxy)          │
        │  │  Port: 3000                     │
        │  │  ├─ Static Files (JS/CSS)       │
        │  │  └─ React Router to index.html  │
        │  └─ React 18 SPA                   │
        │     ├─ Admin Dashboard             │
        │     ├─ Artist Portal               │
        │     └─ Login/Auth                  │
        └────────────────────┬───────────────┘
                             │
              API Calls (Axios with tokens)
                             │
                             ↓
        ┌────────────────────────────────────┐
        │   https://api.echovaultz.com       │
        │   (Backend API)                    │
        │   Port: 5000                       │
        │   ├─ /api/auth/* (login)           │
        │   ├─ /api/admin/* (admin data)     │
        │   ├─ /api/artist/* (artist data)   │
        │   └─ Express.js + Node.js          │
        └────────────────────┬───────────────┘
                             │
                             ↓
        ┌────────────────────────────────────┐
        │      PostgreSQL Database           │
        │      (Persistent Storage)          │
        │      - Users, Artists, Music       │
        │      - Revenue, Analytics          │
        │      - All platform data           │
        └────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Traefik (Load Balancer & SSL)

**Purpose:** Route traffic, manage SSL certificates  
**Port:** 443 (HTTPS), 80 (HTTP)  
**DNS:** `admin.echovaultz.com` → VPS IP  
**SSL:** Auto-provisioned via Let's Encrypt  
**Config:** Labels in docker-compose.yml

**Labels Applied:**
```yaml
traefik.enable=true
traefik.http.routers.admin-frontend.rule=Host(`admin.echovaultz.com`)
traefik.http.routers.admin-frontend.entrypoints=websecure
traefik.http.routers.admin-frontend.tls=true
traefik.http.services.admin-frontend.loadbalancer.server.port=3000
```

### 2. Nginx (Reverse Proxy)

**Purpose:** Serve React SPA, handle routing  
**Port:** 3000 (inside container)  
**Config:** `nginx.conf`  
**Features:**
- Serves static files from `/usr/share/nginx/html`
- React Router: all routes → `/index.html`
- Cache busting for JS/CSS (1-year expiry)
- No-cache for index.html

**Key Nginx Rules:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This makes React Router work properly - all routes are handled by React.

### 3. React SPA (Frontend Application)

**Framework:** React 18 + Vite  
**Port:** 3000 (served by Nginx)  
**Build:** Multi-stage Docker build
- Stage 1: `node:20-alpine` - builds React → `/app/dist`
- Stage 2: `nginx:alpine` - serves dist files

**Key Files:**
- `src/App.jsx` - Main app with routing & sidebar
- `src/pages/*` - Admin pages (9 pages)
- `src/pages/artist/*` - Artist pages (8 pages)
- `src/main.jsx` - Entry point

**Features:**
- Dual login (Admin + Artist)
- Token-based auth (localStorage)
- Axios interceptor adds `Authorization: Bearer {token}` to all requests
- Responsive design (dark theme)
- Sidebar navigation

### 4. Backend API (Node.js/Express)

**Purpose:** Provide data & authentication  
**Port:** 5000  
**Repo:** `echo-vault-backend`  
**Endpoints Used:**
- `POST /api/auth/login-dashboard` - Admin login
- `POST /api/auth/login-artist` - Artist login
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/artist/dashboard` - Artist dashboard data
- Other `/api/admin/*` and `/api/artist/*` endpoints

**Note:** Backend untouched - this frontend only READS from it

### 5. PostgreSQL Database

**Purpose:** Store all platform data  
**Status:** Untouched by frontend deployment  
**Used by:** Backend API only  
**Tables:**
- Users, Artists, Music, Videos, Shorts
- Revenue, Analytics, Payouts
- All existing data preserved

---

## Authentication Flow

```
1. User enters credentials on login page
   ↓
2. Frontend sends POST to /api/auth/login-{admin|artist}
   ↓
3. Backend validates, returns token + user data
   ↓
4. Frontend stores token in localStorage
   ↓
5. Axios interceptor adds to all requests:
   Authorization: Bearer {token}
   ↓
6. Backend validates token on each request
   ↓
7. Dashboard renders with user data
```

**Token Storage:**
- Key: `adminToken` (localStorage)
- Persists across browser sessions
- Lost on logout or browser clear

**Security:**
- ✅ Token-based (stateless)
- ✅ HTTPS only (Traefik SSL)
- ✅ No passwords stored client-side
- ✅ Auto-attached to all API calls

---

## Data Flow

### Admin Dashboard Load

```
1. User visits https://admin.echovaultz.com
   ↓
2. Traefik routes to container :3000
   ↓
3. Nginx serves index.html + React app
   ↓
4. React checks localStorage for token
   ↓
5. If logged in:
   - Calls GET /api/admin/dashboard
   - Axios adds Authorization header
   - Backend returns dashboard data
   - React renders Dashboard component
   ↓
6. User sees sidebar + metrics
```

### Artist Upload

```
1. Artist clicks "Upload Song"
   ↓
2. React navigates to UploadSong page
   ↓
3. User selects file
   ↓
4. Submits POST to /api/artist/upload-song
   ↓
5. Axios adds Authorization header + file
   ↓
6. Backend processes upload
   ↓
7. React shows success/error message
```

---

## Docker Image Build Process

### Multi-Stage Build

**Stage 1: Builder (node:20-alpine)**
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                          # Install dependencies
COPY index.html vite.config.js ./
COPY src ./src
RUN npm run build                   # Build React → dist/
```

**Stage 2: Runtime (nginx:alpine)**
```dockerfile
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

**Benefits:**
- ✅ Small final image (~67MB)
- ✅ Build dependencies removed
- ✅ No node_modules in production
- ✅ Only dist + nginx included

### Build Output

```
dist/
├── index.html               (0.41 KB)
├── assets/
│   ├── index-CHhBtBZ7.css   (0.40 KB)
│   └── index-BujQBgnU.js    (205.56 KB)
```

**Gzipped:** ~68KB (very small!)

---

## Environment & Configuration

### API Endpoint

Hardcoded in `src/App.jsx`:
```javascript
const API_BASE = 'https://api.echovaultz.com/api';
```

To change, edit file and rebuild Docker image.

### Login Credentials

Validated by backend:
- Admin: Uses `/api/auth/login-dashboard`
- Artist: Uses `/api/auth/login-artist`

### Port Mapping

- Client → Traefik: Port 443 (HTTPS)
- Traefik → Container: Port 3000 (via docker-compose expose)
- Container Nginx: Port 3000
- Backend API: Port 5000 (separate)

---

## Networking

### Docker Networks

**echo-vault-network (bridge)**
- Traefik connected
- Admin frontend connected
- Backend API connected
- Allows container-to-container communication
- External network (persistent)

**Container Communication:**
```
Admin Frontend --API calls--> https://api.echovaultz.com
(inside container)
```

---

## Health Checks

### Docker Health Check

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/"]
  interval: 10s
  timeout: 5s
  retries: 3
  start_period: 10s
```

**What it does:**
- Every 10 seconds: tests `http://localhost:3000/`
- If fails 3 times: container marked unhealthy
- After 10 seconds: starts checking

**Verify health:**
```bash
docker ps          # Shows "healthy" or "unhealthy"
docker inspect echo-vault-admin-frontend | grep -A 5 '"Health"'
```

---

## Performance Optimization

### Caching Strategy

**1-year cache for assets:**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**No cache for index.html:**
```nginx
location = /index.html {
    add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

**Result:** Browser caches JS/CSS, always gets fresh HTML

### Bundle Size

- HTML: 0.41 KB
- CSS: 0.40 KB
- JS: 205.56 KB (includes React + Axios)
- Gzipped: ~68 KB

Load time: < 1 second on 4G

---

## Security Considerations

### HTTPS/TLS

- ✅ Enforced by Traefik
- ✅ Let's Encrypt certificates
- ✅ Auto-renewal

### Token Security

- ✅ Stored in localStorage (cleared on logout)
- ✅ Sent in Authorization header
- ✅ Not in URL or cookies
- ✅ Backend validates on each request

### CORS

- ✅ Handled by backend API
- ✅ Frontend doesn't need CORS config
- ✅ Traefik routes same origin

### Content Security

- ✅ Static files served by Nginx
- ✅ No inline scripts
- ✅ React app from trusted source

---

## Troubleshooting Architecture Issues

### "Can't connect to API"

Check:
1. Backend API running: `curl -I https://api.echovaultz.com/api`
2. From container: `docker exec echo-vault-admin-frontend curl -I https://api.echovaultz.com/api`
3. Browser console: F12 → Network tab

### "Login fails"

Check:
1. Is backend API responding? (above)
2. Are credentials correct?
3. Browser console for errors
4. Container logs: `docker-compose logs admin`

### "Traefik routing broken"

Check:
1. DNS: `nslookup admin.echovaultz.com`
2. Traefik logs: `docker logs traefik`
3. Labels in docker-compose: `docker inspect echo-vault-admin-frontend`

### "Container unhealthy"

Check:
1. Nginx running: `docker exec echo-vault-admin-frontend ps aux | grep nginx`
2. Port listening: `docker exec echo-vault-admin-frontend netstat -tuln | grep 3000`
3. Manual test: `docker exec echo-vault-admin-frontend wget -q -O - http://localhost:3000/`

---

**Architecture: ✅ CLEAN, SCALABLE, PRODUCTION-READY**
