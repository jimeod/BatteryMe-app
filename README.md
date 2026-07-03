BatteryMe 🌿

Mobile emotional wellness application that helps you track and improve your daily emotional energy through guided activities.

------------------------------------------------------------

Technologies

Frontend: Vue 3, Vite, JavaScript
Backend: Node.js, Express, MongoDB, Mongoose
Authentication: JWT (JSON Web Tokens)

------------------------------------------------------------

Prerequisites

- Node.js v20 or higher
- MongoDB running locally on localhost:27017
- npm

------------------------------------------------------------

Project Structure

breath-app/
├── src/
│   ├── api.js
│   ├── useStore.js
│   ├── App.vue
│   └── components/
├── backend/
│   ├── server.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── .env
└── package.json

------------------------------------------------------------

Installation

Clone repository:
git clone git@github.com:jimeod/breath-app.git
cd breath-app

Install frontend dependencies:
npm install

Install backend dependencies:
cd backend
npm install
cd ..

------------------------------------------------------------

Environment Variables

Frontend (.env):
VITE_API_URL=http://localhost:5001/api

Backend (backend/.env):
PORT=5001
MONGO_URI=mongodb://localhost:27017/breathe_app
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

------------------------------------------------------------

Running the Project

Backend:
cd backend
npm run dev

Frontend:
npm run dev

Open:
http://localhost:5173

------------------------------------------------------------

Features

- User registration and login with JWT
- Emotional battery system based on daily activities
- 6 daily activities:
  - Guided breathing
  - Emotional check-in
  - Active pause
  - Self-care
  - Positive thinking
  - Digital detox
- Emotional check-in with emoji and notes
- Positive thoughts journal
- Weekly streak tracking
- Undo completed activities
- Auto-login session persistence
- Daily reset system

------------------------------------------------------------

API Endpoints

Auth:
POST /api/auth/register -> Register user
POST /api/auth/login -> Login user

Profile:
GET /api/profile -> Get profile
PUT /api/profile -> Update username
POST /api/profile/activity/:id -> Complete activity
DELETE /api/profile/activity/:id -> Undo activity

Checkins:
POST /api/checkins -> Create check-in
GET /api/checkins -> Get history

Thoughts:
POST /api/thoughts -> Create thought
GET /api/thoughts -> Get history

Health Check:
GET /api/health -> Server status check
