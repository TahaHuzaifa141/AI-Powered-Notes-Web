# 🚀 Setup Guide for AI-Powered Notes App

Follow these steps to get your AI-powered notes app running locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local or cloud) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local installation
- **Git** - [Download here](https://git-scm.com/)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/account/api-keys)

## 🔧 Installation Steps

### 1. Clone & Navigate
```bash
git clone https://github.com/yourusername/ai-notes-app.git
cd ai-notes-app
```

### 2. Install All Dependencies
```bash
npm run install-deps
```
This will install dependencies for:
- Root project (concurrently)
- Client (React app)
- Server (Express app)

### 3. Configure Environment Variables

#### Server Configuration
Create `server/.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-notes
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_super_secret_jwt_key_here
CORS_ORIGIN=http://localhost:3000
```

#### Client Configuration (Optional)
Create `client/.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
REACT_APP_NAME=AI Notes
```

### 4. Setup MongoDB

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB: `mongod`
3. Use connection string: `mongodb://localhost:27017/ai-notes`

#### Option B: MongoDB Atlas (Recommended)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Replace `MONGODB_URI` in server/.env

### 5. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Create account or login
3. Generate API key
4. Add to `OPENAI_API_KEY` in server/.env

## 🚀 Running the Application

### Development Mode (Recommended)
```bash
npm run dev
```
This starts both frontend and backend simultaneously:
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend API: http://localhost:5000

### Individual Commands
```bash
# Start only backend
npm run server

# Start only frontend
npm run client

# Build for production
npm run build
```

## 🔍 Verification

1. Open http://localhost:3000
2. You should see the beautiful AI Notes homepage
3. Click "Get Started" to go to notes page
4. Try creating a note and using AI summarization

## 🐛 Troubleshooting

### Common Issues

#### "MongoDB connection failed"
- ✅ Check MONGODB_URI in server/.env
- ✅ Ensure MongoDB is running (if local)
- ✅ Check network connection (if Atlas)

#### "OpenAI API Error"
- ✅ Verify OPENAI_API_KEY in server/.env
- ✅ Check API key is valid
- ✅ Ensure you have API credits

#### "Port already in use"
- ✅ Change PORT in server/.env
- ✅ Kill process using the port
- ✅ Use different ports for client/server

#### "Dependencies not found"
- ✅ Run `npm run install-deps` again
- ✅ Delete node_modules and reinstall
- ✅ Check Node.js version (>=14)

### Reset Everything
```bash
# Clean install
rm -rf node_modules client/node_modules server/node_modules
npm run install-deps
```

## 📱 Mobile Testing

The app is fully responsive! Test on mobile:
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update client/.env: `REACT_APP_API_URL=http://YOUR_IP:5000/api`
3. Access from phone: `http://YOUR_IP:3000`

## 🎯 Next Steps

Once everything is running:
1. 📝 Create your first note
2. 🤖 Try AI summarization
3. 🏷️ Use AI tag generation
4. 🔍 Test search and filtering
5. 📱 Test mobile responsiveness
6. 🎨 Explore the beautiful animations

## 🛠️ Development Tips

- Use Chrome DevTools for debugging
- Check console for errors
- Backend logs show in terminal
- MongoDB Compass for database GUI
- Postman for API testing

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Look at console errors (F12)
3. Check terminal logs
4. Create an issue on GitHub

Happy coding! 🎉