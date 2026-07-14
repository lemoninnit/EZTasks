# EZTasks

**Task Management Reimagined** — A premium, full-stack web application designed for modern teams. Built for speed, clarity, and precision, EZTasks offers a beautiful glassmorphism UI paired with robust backend task management.

> 🟢 **Database:** Hosted on **Neon PostgreSQL** (cloud). No local database installation required!

---

## ✨ Features & Capabilities

- **Premium UI/UX Design** — Completely modernized with a dark glassmorphism aesthetic, smooth `framer-motion` page transitions, and scroll-based micro-animations.
- **Dynamic Task Management** — Create, edit, and organize tasks with precision. Track status from Pending → In Progress → Completed.
- **Smart Deadlines & Reminders** — Automatic deadline reminders and visual timelines. Stay ahead of overdue, due today, and due this week items.
- **Visual Calendar** — Monthly grid view with color-coded task deadline markers.
- **Assignment Analytics** — Dashboard metrics (Completed, Pending, In-Progress) presented beautifully.
- **Secure Authentication** — JWT-secured sessions, encrypted data, and protected routing.

---

## 🚀 Quick Start Guide

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| Java (JDK) | 17+ |
| Maven | (Bundled via `mvnw` wrapper) |

---

### 1. Start the Backend (Spring Boot)

The backend connects directly to a Neon PostgreSQL cloud database. Credentials are pre-configured, meaning **zero database setup is required** on your end.

```bash
cd backend
./mvnw spring-boot:run
```

> **Windows users:** Use `mvnw.cmd spring-boot:run`
> The API will launch on **`http://localhost:8080`**. Tables are automatically generated via JPA/Hibernate.

---

### 2. Start the Frontend (React + Vite)

Open a **new terminal window** in the project root:

```bash
cd frontend
npm install
npm run dev
```

> The React app will launch instantly via Vite at: **`http://localhost:5173`** (or `3000` depending on Vite configuration). Check the terminal output for the exact URL.

---

### 3. Usage

1. Open the frontend URL in your browser.
2. Experience the new scroll-animated landing page.
3. Click **Start Your Free Trial** or **Get Started** to create an account.
4. Log in and explore the Dashboard, Calendar, and Tasks features.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Framer Motion (Animations), Lucide React (Icons), Vanilla CSS |
| **Backend** | Java 17, Spring Boot 3.x, Spring Security, Spring Data JPA |
| **Database** | Neon PostgreSQL (Cloud-hosted) |
| **Auth** | JWT (JSON Web Tokens) with BCrypt hashing |

---

## 📁 Project Structure

```text
EZTasks/
├── backend/                        # Spring Boot REST API
│   ├── src/main/java/              # Controllers, Services, Entities
│   └── src/main/resources/
│       └── application.properties  # Cloud DB & JWT Config
│
└── frontend/                       # React 18 (Vite)
    ├── index.html
    └── src/
        ├── api/                    # Axios API client integrations
        ├── components/             # Reusable UI (TextTicker, Cards, Headers)
        ├── contexts/               # JWT Auth Context
        ├── layouts/                # AppLayout (Sidebar) & AuthLayout
        └── pages/                  # Landing, Dashboard, Tasks, Calendar, etc.
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| **Port 8080 in use** | Change `server.port` in `application.properties`. |
| **`mvnw` permission denied** | Run `chmod +x mvnw` (Mac/Linux), then retry. |
| **Frontend fails to start** | Ensure you ran `npm install` inside the `frontend/` directory first. |
| **Backend connection refused** | Check your internet connection (Neon is a cloud DB). |
| **CORS Errors** | Ensure the backend is actively running on port `8080`. |
