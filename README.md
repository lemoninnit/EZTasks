# ClariTask

**School Task & Reminder Manager** — A full-stack web application for managing tasks, deadlines, and smart task-deadline reminders.

> 🟢 Database is hosted on **Neon PostgreSQL** (cloud). No local database installation required.

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| Java (JDK) | 17+ |
| Maven | Bundled via `mvnw` wrapper |

---

### 1. Clone the Repository

```bash
git clone https://github.com/lemoninnit/ClariTask.git
cd ClariTask
```

---

### 2. Start the Backend

The backend connects to a Neon PostgreSQL cloud database. No local database setup is needed — credentials are already configured in `application.properties`.

```bash
cd backend
./mvnw spring-boot:run
```

> **Windows users:** Use `mvnw.cmd spring-boot:run` if the above doesn't work.

The backend API will start at: **`http://localhost:8080`**

> Tables are created automatically on first run via JPA/Hibernate (`ddl-auto=update`).

---

### 3. Start the Frontend

Open a **new terminal** in the project root:

```bash
cd frontend
npm install
npm start
```

The React app will start at: **`http://localhost:3000`**

---

### 4. Open the App

1. Go to **`http://localhost:3000`**
2. Click **Sign Up** to create an account
3. Log in and start managing your tasks

---

## 🔧 Configuration

### Backend — `backend/src/main/resources/application.properties`

| Property | Value |
|----------|-------|
| Database | Neon PostgreSQL (cloud) |
| Backend port | `8080` |
| JPA DDL mode | `update` (auto-creates tables) |
| JWT expiry | 24 hours (`86400000 ms`) |

> ⚠️ The database credentials in `application.properties` are shared for this project. For production deployments, move sensitive values to environment variables.

### Frontend

| Setting | Value |
|---------|-------|
| Dev server port | `3000` |
| API base URL | `http://localhost:8080` (configured in `src/api/`) |

---

## ✨ Features

- **Task Management** — Create, edit, delete, and track tasks with due dates and times
- **Calendar View** — Visual monthly calendar with color-coded task deadlines by status
- **Categories** — Organize tasks with custom categories and filter views
- **Task Reminders** — Automatic deadline reminders (overdue / due today / due this week) replacing manual announcements
- **Dashboard** — Stats overview (completed, pending, in-progress, total) + welcome banner
- **User Profiles** — Update account name, email, or delete account
- **Secure Authentication** — JWT-based login and protected routes

---

## 📁 Project Structure

```
ClariTask/
├── backend/                        # Spring Boot 3 REST API (Java 17)
│   ├── src/main/java/              # Controllers, Services, Entities
│   └── src/main/resources/
│       └── application.properties  # Database & JWT config
│
└── frontend/                       # React 18 (Create React App)
    ├── public/
    └── src/
        ├── api/                    # Axios API clients
        ├── components/             # Reusable UI components
        ├── contexts/               # Auth context (JWT)
        ├── layouts/                # AppLayout with sidebar + header
        └── pages/                  # Dashboard, Tasks, Calendar, etc.
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 8080 already in use | Change `server.port` in `application.properties` |
| `mvnw` permission denied (Mac/Linux) | Run `chmod +x mvnw` then retry |
| Frontend won't start | Run `npm install` inside `frontend/` |
| `npm start` opens wrong port | Set `PORT=3000` environment variable or check `.env` |
| Backend fails to connect to DB | Ensure you have internet access (Neon is a cloud DB) |
| CORS error in browser | Confirm backend is running on port `8080` |

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router, Lucide Icons |
| Backend | Spring Boot 3.5, Spring Security, Spring Data JPA |
| Database | Neon PostgreSQL (cloud-hosted) |
| Auth | JWT (JSON Web Tokens) with BCrypt password hashing |
| ORM | Hibernate / JPA |

---

## 📋 Feature Checklist

### Frontend

| Feature | Status |
|---------|--------|
| **Authentication** | |
| Login & Signup pages | ✅ |
| JWT token management | ✅ |
| Protected routes | ✅ |
| **Tasks** | |
| Create / Edit / Delete tasks | ✅ |
| Due date & time input | ✅ |
| Status tracking (Pending → In Progress → Completed) | ✅ |
| Task filtering by category | ✅ |
| Search tasks by title / description / category | ✅ |
| **Categories** | |
| Create & delete categories | ✅ |
| Category chip filtering on dashboard | ✅ |
| **Calendar** | |
| Monthly grid with task deadline markers | ✅ |
| Color-coded task chips by status | ✅ |
| Click-to-select day task sidebar | ✅ |
| **Task Reminders** | |
| Auto-generated deadline reminders | ✅ |
| Severity levels: Overdue / Due Today / Due This Week | ✅ |
| **Dashboard** | |
| Welcome banner with today's task count | ✅ |
| Stats row (Completed / Pending / In Progress / Total) | ✅ |
| Categories sidebar + tasks list | ✅ |
| **Profile** | |
| Update name & email | ✅ |
| Delete account (cascades all data) | ✅ |
| **UI/UX** | |
| Unified page headers across all views | ✅ |
| Consistent sidebar branding | ✅ |
| Hover effects & micro-animations | ✅ |
| Responsive layout | ✅ |

### Backend

| Feature | Status |
|---------|--------|
| **Auth** | |
| Registration & login endpoints | ✅ |
| JWT generation & validation | ✅ |
| BCrypt password hashing | ✅ |
| **Tasks API** | |
| CRUD endpoints | ✅ |
| Status update endpoint | ✅ |
| User-scoped task queries | ✅ |
| **Categories API** | |
| CRUD endpoints | ✅ |
| Foreign key + constraint handling (PostgreSQL) | ✅ |
| **User API** | |
| Get / Update / Delete current user | ✅ |
| Cascade delete for all user data | ✅ |
| **Reminders API** | |
| Real-time deadline reminder generation | ✅ |
| Filtered by authenticated user | ✅ |
| Excludes completed tasks | ✅ |
| **Database** | |
| Neon PostgreSQL integration | ✅ |
| JPA/Hibernate ORM with auto DDL | ✅ |
| Entity relationships & cascades | ✅ |
