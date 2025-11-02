# CloudPad

This is a notes app where users can register, log in, and manage their private notes. The backend uses NestJS and SQLite for authentication and CRUD features. The frontend which uses ReactJS, lets users view, add, edit, and delete notes easily.

## Tech Stack

- ReactJS
- TypeScript
- Tailwind CSS  
- NestJS
- SQLite

## Features

- User authentication (Sign Up & Login)
- Create, read, update, and delete notes
- Cloud-themed responsive UI
- Real-time updates

## Prerequisites

- Node.js
- npm

## Instructions

### 1. Clone & Install

```bash
git clone https://github.com/mazuix/Activity2.git
cd cloudpad

cd backend
npm install

# Install frontend
cd ../frontend
npm install
```

### 2. Configure Backend

Edit `backend/src/auth/constants.ts`:
```typescript
export const jwtConstants = {
  secret: 'YOUR_SUPER_SECRET_KEY', // Change this!
};
```

### 3. Run the Application

**Start Backend:**
```bash
cd backend
npm run start:dev
```
Server runs on `http://localhost:3000`

**Start Frontend:**
```bash
cd frontend
npm run dev
```
App runs on `http://localhost:5173`

## 📡 API Endpoints

**Base URL:** `/api`

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login (returns JWT token)

### Notes (Protected - requires JWT)
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create note
- `PATCH /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

**Authorization header:** `Bearer <your_jwt_token>`

## 📁 Project Structure

```
cloudpad/
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── notes/         # Notes CRUD operations
│   │   ├── users/         # User management
│   │   └── database/      # TypeORM entities
│   └── notes.db           # SQLite database (auto-created)
│
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   ├── services/      # API service layer
    │   └── types/         # TypeScript types
    └── dist/              # Production build
```

## 🔒 Security

- Passwords hashed with bcrypt
- JWT token authentication
- Protected routes with guards
- User-specific note ownership
- CORS configured for frontend

## 🚀 Production Build

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm run build
# Deploy dist/ folder to hosting service
```

## 📚 Documentation

- **API Docs:** http://localhost:3000/api-docs (Swagger UI)
- **Frontend:** Update `src/services/api.ts` for API URL
- **Backend:** Configure CORS in `src/main.ts`

## 🔧 Common Issues

**Port in use:** Change port in `backend/src/main.ts` or `frontend/vite.config.ts`

**CORS errors:** Update origin in `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

**Database reset:** Delete `backend/notes.db` and restart

---