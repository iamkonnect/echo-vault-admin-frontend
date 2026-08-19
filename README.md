# 🎵 EchoVault Admin Dashboard Frontend

Standalone React frontend for the EchoVault admin & artist dashboard.

## Features

- **Admin Dashboard:** User management, content moderation, analytics
- **Artist Portal:** Music uploads, revenue tracking, analytics
- **Dual Login:** Separate admin and artist authentication flows
- **Responsive Design:** Dark theme with modern UI
- **Token-based Auth:** Secure localStorage token management
- **Traefik Integration:** HTTPS via admin.echovaultz.com

## Setup

### Local Development

```bash
npm install
npm run dev
# Runs on http://localhost:3000
```

### Docker Build

```bash
docker build -t iamkonnect/echo-vault-admin-frontend:latest .
```

### Docker Compose Deploy

```bash
# Ensure network exists
docker network create echo-vault-network

# Deploy
docker-compose up -d
```

## Environment

- **API:** https://api.echovaultz.com/api
- **Login Endpoint:** `/api/auth/login-dashboard`, `/api/auth/login-artist`
- **Admin Dashboard:** `/api/admin/dashboard`
- **Artist Dashboard:** `/api/artist/dashboard`

## Credentials

```
Admin:  akwera@echovaultz.com / [password]
Artist: artist@gmail.com / [password]
```

## Architecture

- **Frontend:** React 18 + Vite
- **Server:** Nginx (reverse proxy)
- **Port:** 3000
- **URL:** https://admin.echovaultz.com (via Traefik)
- **API:** Calls https://api.echovaultz.com/api

## Project Structure

```
src/
├── App.jsx              # Main app with routing & sidebar
├── pages/
│   ├── Dashboard.jsx    # Admin home
│   ├── UserDirectory.jsx
│   ├── ArtistVerification.jsx
│   ├── MusicManagement.jsx
│   ├── VideoManagement.jsx
│   ├── ShortsManagement.jsx
│   ├── AdsManagement.jsx
│   ├── SliderManagement.jsx
│   ├── Payouts.jsx
│   └── artist/
│       ├── ArtistDashboard.jsx
│       ├── UploadSong.jsx
│       ├── MyMusic.jsx
│       ├── UploadVideo.jsx
│       ├── UploadShorts.jsx
│       ├── ArtistRevenue.jsx
│       ├── ArtistInsights.jsx
│       └── ArtistLiveInsights.jsx
├── main.jsx
└── index.css
```

## License

Private - EchoVault Inc.
