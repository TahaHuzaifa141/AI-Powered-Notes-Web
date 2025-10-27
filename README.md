# AI-Powered Notes App 🚀

A beautiful, modern MERN stack notes application with AI summarization capabilities.

## ✨ Features

- 📝 **CRUD Operations** - Create, Read, Update, Delete notes
- 🤖 **AI Summarization** - Generate intelligent summaries using OpenAI
- 🎨 **Beautiful UI** - Modern design with glassmorphism and smooth animations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔍 **Search & Filter** - Find your notes instantly
- 💾 **Auto-save** - Never lose your work
- 🌙 **Dark/Light Theme** - Choose your preferred mode

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library
- **Material UI** - Beautiful component library
- **Framer Motion** - Smooth animations
- **Axios** - API communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework (MVC pattern)
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **OpenAI API** - AI summarization

## 🏗️ Architecture

Following clean **MVC (Model-View-Controller)** pattern:

```
├── client/               # React frontend (View)
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── theme/        # Custom Material UI theme
│   │   ├── utils/        # Helper functions
│   │   └── services/     # API calls
├── server/               # Node.js backend
│   ├── models/           # MongoDB models (Model)
│   ├── controllers/      # Business logic (Controller)
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── config/           # Configuration files
```

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm run install-deps
   ```

2. **Setup environment variables**
   ```bash
   # In server/.env
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. **Run the application**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🎨 Design Highlights

- **Modern Gradient Backgrounds**
- **Glassmorphism Effects**
- **Smooth Page Transitions**
- **Elegant Typography**
- **Professional Color Palette**
- **Micro-interactions**

## 📱 Demo

[Add your video demo link here]

## 🤝 Contributing

Feel free to contribute to this project! Pull requests are welcome.

## 📄 License

MIT License - see LICENSE file for details.