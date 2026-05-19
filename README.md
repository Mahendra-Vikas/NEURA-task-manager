# Built as part of an AI-assisted product engineering assessment.


A production-ready, fully modular MERN stack SaaS starter template designed for quick hackathon deployment and enterprise-level scalability.

## 🚀 Features

### Authentication System
- ✅ JWT-based email/password authentication
- ✅ Secure password hashing with bcrypt
- ✅ Protected routes with token verification
- ✅ Persistent login using localStorage
- ✅ Logout functionality
- ✅ Complete validation with error handling

### User Dashboard
- ✅ Modern responsive design
- ✅ Sidebar navigation
- ✅ Dynamic navbar with theme toggle
- ✅ User profile section
- ✅ Analytics placeholder cards
- ✅ Recent activity section
- ✅ Mobile-first responsive layout

### Floating Widgets
- ✅ **AI Voice Assistant** - Top-left corner with premium animations
  - Glassmorphism effect
  - Pulsing glow animation
  - Links to: https://neura-product-support-e4skmk.sandbox.livekit.io/
  
- ✅ **Help & Doubts** - Bottom-left corner
  - Knowledge base integration
  - Links to: https://neura-product-support.document360.io/
  - Modern SaaS UI

### Premium UI/UX
- ✅ Dark/Light theme toggle with persistence
- ✅ Glassmorphism design system
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Gradient effects inspired by Kovai branding
- ✅ Enterprise-level aesthetic

### Tech Stack
- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB (local)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **API Client:** Axios
- **Routing:** React Router DOM v6
- **State Management:** Context API
- **Notifications:** Sonner Toast

## 📁 Project Structure

```
kovai-starter/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/          # Auth components
│   │   │   ├── dashboard/     # Dashboard components
│   │   │   ├── ui/            # Reusable UI components
│   │   │   └── floating/      # Floating widgets
│   │   ├── pages/             # Page components
│   │   ├── layouts/           # Layout components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API services
│   │   ├── context/           # Context API (Auth, Theme)
│   │   ├── utils/             # Helper functions
│   │   ├── animations/        # Framer Motion variants
│   │   ├── assets/            # Static assets
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── src/
│   │   ├── routes/            # API routes
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/        # Express middleware
│   │   ├── models/            # MongoDB models
│   │   ├── config/            # Database config
│   │   ├── utils/             # Helper utilities
│   │   └── server.js          # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── README.md
└── .gitignore
```

## 🎨 Design System

### Color Palette
- **Primary:** Teal (#00BFA5)
- **Secondary:** Purple (#7E57C2)
- **Accent:** Orange (#FB8C00), Green (#43A047)
- **Background:** Charcoal (#111827), White (#FFFFFF)
- **Neutral:** Light Gray (#F3F4F6)

### UI Elements
- Glassmorphism cards with soft shadows
- Smooth animated transitions
- Responsive rounded corners
- Premium gradient effects
- Accessible color contrasts

## 🛠️ Installation

### Prerequisites
- Node.js >= 16
- MongoDB running locally or remote connection
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your configuration:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/kovai-starter
   JWT_SECRET=your-super-secret-key-here
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

5. **Ensure MongoDB is running:**
   ```bash
   # If using MongoDB locally
   mongod
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 🚀 Quick Start

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Open browser:** `http://localhost:5173`

4. **Create account and explore!**

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout

### User
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `POST /api/users/change-password` - Change password (protected)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard stats (protected)
- `GET /api/dashboard/activity` - Get recent activity (protected)

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ CORS configuration
- ✅ Protected API routes
- ✅ Secure token storage
- ✅ HTTP-only cookie support (can be added)
- ✅ Input validation and sanitization

## 📦 Available Scripts

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Backend
```bash
npm run dev        # Start with nodemon (auto-restart)
npm start          # Start production server
npm test           # Run tests
```

## 🎯 Architecture Benefits

### Modular & Scalable
- Easy to add new features without breaking existing code
- Reusable components and utilities
- Clean separation of concerns
- Service layer for API calls

### Hackathon-Ready
- Pre-built authentication system
- Dashboard template ready to customize
- Easy API integration
- Deployment-ready structure

### Production-Ready
- Error handling and validation
- Loading states and skeleton loaders
- Toast notifications
- Responsive design
- Performance optimizations
- Clean code with comments

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy using platform CLI or UI
3. Connect MongoDB Atlas
4. Update frontend API URL

## 🎓 For Future Hackathons

This template is designed for **zero-breaking-change feature additions**:

```
To add new features:
1. Create new page in /pages
2. Add new API route in /routes
3. Add new component in /components
4. Add new context if needed for state
5. Update routing in App.jsx
```

No existing code needs to be modified. The modular architecture ensures clean integration of new features.

## 🤝 Contributing

Feel free to fork and customize for your hackathon!

## 📄 License

MIT License - Feel free to use for commercial and personal projects.

## 🎉 Built With Kovai

Created as a premium SaaS starter template following modern best practices.

---

**Happy Coding! 🚀**
