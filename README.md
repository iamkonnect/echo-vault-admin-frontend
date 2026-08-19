# 🎵 EchoVault Admin Dashboard Frontend

A standalone React-based admin dashboard and artist portal for the EchoVault music platform.

**Status:** ✅ Production Ready | **Docker:** iamkonnect/echo-vault-admin-frontend:latest

---

## 📋 Quick Links

- **Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Architecture & Technical Details:** [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Backend API:** https://github.com/iamkonnect/echo-vault-backend
- **Docker Hub:** https://hub.docker.com/r/iamkonnect/echo-vault-admin-frontend

---

## 🎯 Features

### Admin Dashboard
- 📊 Platform metrics (users, artists, payouts, reports)
- 👥 User directory management
- ⭐ Artist verification system
- 🎵 Music management & moderation
- 🎬 Video management
- 📹 Shorts management
- 📢 Ads management
- 🎠 Slider/banner management
- 💰 Payout tracking & administration
- 📋 Sidebar navigation with sections

### Artist Portal
- 🎵 Upload music tracks
- 🎬 Upload videos
- 📹 Upload shorts (< 60 seconds)
- 📊 Music library management
- 💰 Revenue tracking
- 📈 Performance analytics
- 📊 Live insights & real-time stats
- 👥 Follower tracking

### Common Features
- 🔐 Dual login system (Admin + Artist)
- 🔑 Token-based authentication
- 🎨 Responsive dark theme UI
- 📱 Mobile-friendly design
- 🔄 Auto-refreshing data
- ⚡ Fast load times (< 1 second)
- 🔒 HTTPS via Traefik SSL

---

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment

```bash
# Build image
docker build -t iamkonnect/echo-vault-admin-frontend:latest .

# Run locally
docker run -p 3000:3000 iamkonnect/echo-vault-admin-frontend:latest

# Deploy to VPS (see DEPLOYMENT.md)
docker-compose up -d
```

---

## 📦 Docker Image

**Image:** `iamkonnect/echo-vault-admin-frontend:latest`  
**Size:** ~67MB (205KB gzipped)  
**Base:** `nginx:alpine` (runtime)  
**Build:** Multi-stage (node:20-alpine builder → nginx runtime)

### Pull & Run

```bash
docker pull iamkonnect/echo-vault-admin-frontend:latest
docker run -p 3000:3000 iamkonnect/echo-vault-admin-frontend:latest
```

---

## 🌐 Environment

| Variable | Value |
|----------|-------|
| **API Endpoint** | `https://api.echovaultz.com/api` |
| **Frontend Port** | 3000 |
| **Frontend URL** | https://admin.echovaultz.com |
| **Auth Endpoints** | `/api/auth/login-dashboard`, `/api/auth/login-artist` |

---

## 🔑 Login Credentials

```
Admin Dashboard:
  Email:    akwera@echovaultz.com
  Password: [your admin password]

Artist Portal:
  Email:    artist@gmail.com
  Password: [your artist password]
```

---

## 📁 Project Structure

```
echo-vault-admin-frontend/
├── src/
│   ├── App.jsx                    # Main app with routing & sidebar
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Global styles
│   ├── pages/
│   │   ├── Dashboard.jsx          # Admin home page
│   │   ├── UserDirectory.jsx      # User management
│   │   ├── ArtistVerification.jsx # Artist verification
│   │   ├── MusicManagement.jsx    # Music management
│   │   ├── VideoManagement.jsx    # Video management
│   │   ├── ShortsManagement.jsx   # Shorts management
│   │   ├── AdsManagement.jsx      # Ads management
│   │   ├── SliderManagement.jsx   # Slider/banner management
│   │   ├── Payouts.jsx            # Payouts page
│   │   ├── Placeholder.jsx        # Placeholder template
│   │   └── artist/
│   │       ├── ArtistDashboard.jsx
│   │       ├── UploadSong.jsx
│   │       ├── MyMusic.jsx
│   │       ├── UploadVideo.jsx
│   │       ├── UploadShorts.jsx
│   │       ├── ArtistRevenue.jsx
│   │       ├── ArtistInsights.jsx
│   │       └── ArtistLiveInsights.jsx
│   └── pages/index.js             # Page exports
├── Dockerfile                     # Multi-stage Docker build
├── docker-compose.yml             # Docker Compose with Traefik labels
├── nginx.conf                     # Nginx config for React Router
├── package.json                   # Dependencies
├── vite.config.js                 # Vite config
├── index.html                     # HTML template
├── README.md                      # This file
├── DEPLOYMENT.md                  # VPS deployment guide
├── ARCHITECTURE.md                # Technical architecture
└── .gitignore

```

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite 5
- **HTTP Client:** Axios
- **Server:** Nginx (Alpine Linux)
- **Container:** Docker with multi-stage build
- **Orchestration:** Docker Compose
- **Load Balancer:** Traefik
- **SSL/TLS:** Let's Encrypt (auto-renewed)

---

## 🔄 Authentication Flow

```
1. User submits login form
   ↓
2. Frontend calls POST /api/auth/login-{admin|artist}
   ↓
3. Backend validates credentials
   ↓
4. Backend returns token + user data
   ↓
5. Frontend stores token in localStorage
   ↓
6. All subsequent requests include:
   Authorization: Bearer {token}
   ↓
7. Dashboard renders with authenticated data
```

---

## 📊 API Integration

### Endpoints Used

**Authentication:**
- `POST /api/auth/login-dashboard` - Admin login
- `POST /api/auth/login-artist` - Artist login

**Admin:**
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/users` - User list
- `GET /api/admin/artists` - Artist list
- `GET /api/admin/music` - Music list
- `POST /api/admin/verify-artist` - Verify artist

**Artist:**
- `GET /api/artist/dashboard` - Artist dashboard
- `GET /api/artist/music` - Artist's music
- `POST /api/artist/upload-song` - Upload music
- `POST /api/artist/upload-video` - Upload video
- `GET /api/artist/revenue` - Revenue data

---

## 🚀 Deployment

### VPS Deployment (Quick)

```bash
# SSH to VPS
ssh root@187.124.116.216

# Create network & directory
docker network create echo-vault-network
mkdir -p /opt/echo-vault-admin-frontend && cd /opt/echo-vault-admin-frontend

# Get docker-compose
curl -o docker-compose.yml https://raw.githubusercontent.com/iamkonnect/echo-vault-admin-frontend/main/docker-compose.yml

# Deploy
docker-compose up -d
```

**Visit:** https://admin.echovaultz.com ✅

### Full Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Prerequisites
- Step-by-step setup
- Verification checklist
- Troubleshooting
- Monitoring
- Updates & maintenance

---

## 📈 Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed diagrams and technical breakdown:
- System architecture
- Component breakdown
- Authentication flow
- Data flow
- Docker build process
- Networking
- Security
- Performance

---

## 🔒 Security

- ✅ **HTTPS Only:** SSL via Traefik (Let's Encrypt)
- ✅ **Token-based Auth:** No password storage
- ✅ **Authorization Headers:** Auto-attached to all requests
- ✅ **Static Content:** Served by Nginx
- ✅ **No Inline Scripts:** All code bundled
- ✅ **CORS:** Handled by backend API

---

## 📊 Performance

- **Build Size:** 205KB (67KB gzipped)
- **Load Time:** < 1 second
- **Cache Strategy:** 1-year for assets, no-cache for HTML
- **Image Size:** ~67MB (small for a full SPA)

---

## 🛑 Troubleshooting

### Container won't start
```bash
docker-compose logs admin
```

### Can't reach admin.echovaultz.com
```bash
curl -I https://admin.echovaultz.com/
docker logs traefik
```

### Login fails
```bash
# Check backend API
curl -I https://api.echovaultz.com/api

# Check browser console (F12)
# See DEPLOYMENT.md for more troubleshooting
```

See [DEPLOYMENT.md - Troubleshooting](./DEPLOYMENT.md#troubleshooting) for complete guide.

---

## 🔄 Updates

### Pull Latest Image

```bash
docker pull iamkonnect/echo-vault-admin-frontend:latest
docker-compose restart
```

### Rebuild from Source

```bash
npm install
npm run build
docker build -t iamkonnect/echo-vault-admin-frontend:latest .
docker push iamkonnect/echo-vault-admin-frontend:latest
```

---

## 📝 Development

### Adding a New Page

1. Create `src/pages/NewPage.jsx`:
```jsx
import React from 'react';
import { Placeholder } from './Placeholder';

export default function NewPage() {
  return <Placeholder title="New Page" icon="📄" />;
}
```

2. Import in `src/App.jsx`
3. Add to navigation
4. Build: `npm run build`

### Testing Locally

```bash
npm run dev
# Visit http://localhost:3000
```

---

## 📜 License

Private - EchoVault Inc. © 2024

---

## 📞 Support

- **GitHub Issues:** https://github.com/iamkonnect/echo-vault-admin-frontend/issues
- **Docker Hub:** https://hub.docker.com/r/iamkonnect/echo-vault-admin-frontend
- **Backend:** https://github.com/iamkonnect/echo-vault-backend

---

## ✅ Status

- ✅ Frontend: Production Ready
- ✅ Docker Image: Published
- ✅ Documentation: Complete
- ✅ Deployment: Tested
- ✅ API Integration: Working
- ✅ Authentication: Implemented

**Ready to deploy!** 🚀
