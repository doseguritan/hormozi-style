# 💼 Hormozi-Style Landing Page Funnel

This is a high-converting funnel inspired by Alex Hormozi’s direct-response marketing strategies. Built with **React + Vite + TailwindCSS** on the frontend and **FastAPI + SQLite** on the backend.

---

## 🌐 Live URLs (Local Dev)

| Feature                 | URL                                       |
|-------------------------|-------------------------------------------|
| Landing Page (Frontend) | http://localhost:5173/                    |
| Lead Submit API         | http://localhost:8000/submit              |
| Page Visit Tracker      | http://localhost:8000/track/visit         |
| Analytics Dashboard     | http://localhost:8000/analytics           |

> Try a tracked visit:  
> http://localhost:5173/?utm_source=tiktok

---

## 🔧 Tech Stack

### Frontend
- Vite + React
- TailwindCSS
- Framer Motion (animations)
- react-phone-number-input (with auto country detection)
- Form modal & CTA banner
- UTM + Pixel tracking simulation

### Backend
- FastAPI
- SQLite with SQLAlchemy (async)
- CORS middleware
- Tracking for visits, submissions, and UTM source

---

## 🚀 Getting Started

### ▶️ 1. Backend Setup (FastAPI)

```bash
cd backend
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
pip install -r requirements.txt
fastapi dev
```

API Url: `http://localhost:8000`

---

## 🧪 API Endpoints

| Method | URL                          | Description                     |
|--------|------------------------------|---------------------------------|
| `POST` | `/submit`                    | Submits lead form               |
| `GET`  | `/track/visit?utm_source=X`  | Logs a visit from IP + UTM      |
| `GET`  | `/analytics`                 | Returns total leads, visits     |

---

### ▶️ 2. Frontend Setup (React + Vite)

```bash
cd frontend
yarn
yarn dev
```

Open in your browser: `http://localhost:5173`

---

## 🌍 Example Tracked Visit

```
http://localhost:5173/?utm_source=facebook
```

Console Logs (Frontend):

```
[Tracking] utm_source: facebook
[FB Pixel] PageView triggered
[TikTok Pixel] PageView triggered
```

---

## 📊 Analytics Sample Response

```json
{
  "total_leads": 12,
  "total_visits": 42,
  "unique_visitors": 39
}
```

---

## 💡 Features You Can Extend

- [ ] Admin panel to review leads
- [ ] CSV export
- [ ] Email notifications
- [ ] Real Facebook/TikTok Pixel integration
- [ ] Visitor heatmap or analytics dashboard

---

## 📜 License

MIT — free to use and customize for landing pages, funnels, or SaaS MVPs.