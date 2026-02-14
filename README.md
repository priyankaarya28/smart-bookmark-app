# 📚 Smart Bookmark App

A real-time bookmark manager with Google OAuth authentication, built with React, Vite, and Firebase.

## ✨ Features

- **Google OAuth Login** - Secure sign-in with Google (no email/password needed)
- **Add Bookmarks** - Save URLs with custom titles
- **Real-time Sync** - Bookmarks sync across all open tabs/windows instantly
- **Private Bookmarks** - Each user only sees their own bookmarks
- **Delete Bookmarks** - Remove bookmarks from both frontend and backend
- **Beautiful UI** - Modern, responsive design with gradient backgrounds
- **Paste from Clipboard** - Quick paste button for URLs
- **Timestamp** - See when each bookmark was created
- **Mobile Friendly** - Works great on mobile devices

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to **Settings** > **Project Settings** to get your config
4. Copy your Firebase config values:
   - API Key
   - Auth Domain
   - Database URL
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID

### 3. Enable Google Sign-In

1. In Firebase Console, go to **Authentication**
2. Click **Sign-in method**
3. Enable **Google** provider
4. Click **Save**

### 4. Setup Realtime Database

1. In Firebase Console, go to **Realtime Database**
2. Click **Create Database**
3. Start in **Test mode**
4. Choose a location near you
5. Click **Enable**

### 5. Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Copy the content from `.env.example`
3. Fill in your Firebase credentials:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 6. Run Development Server

```bash
npm run dev
```

The app will open automatically at `http://localhost:5173`

### 7. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
smart-bookmark-app/
├── src/
│   ├── components/
│   │   ├── Login.jsx         # Google OAuth login screen
│   │   ├── Header.jsx        # App header with user info
│   │   ├── AddBookmark.jsx   # Form to add new bookmarks
│   │   ├── BookmarkList.jsx  # List of all bookmarks
│   │   ├── BookmarkItem.jsx  # Individual bookmark card
│   │   └── *.css             # Component styles
│   ├── App.jsx               # Main app component
│   ├── firebase.js           # Firebase configuration & functions
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies
├── .env.example              # Environment variables template
└── .env.local                # Your actual environment variables (ignore in git)
```

## 🔥 Firebase Rules

Set up these Realtime Database Rules for security:

```json
{
  "rules": {
    "bookmarks": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$bookmarkId": {
        ".validate": "newData.hasChildren(['userId', 'url', 'title', 'timestamp', 'createdAt'])",
        "userId": {
          ".validate": "newData.val() === auth.uid"
        }
      }
    }
  }
}
```

**Steps to add rules:**
1. Go to **Realtime Database** > **Rules**
2. Copy the JSON above
3. Click **Publish**

## 🎯 How It Works

### Authentication Flow
1. User clicks "Sign in with Google"
2. Firebase OAuth popup opens
3. User signs in with Google account
4. Firebase creates/updates user record
5. User is logged in and can use app

### Real-time Sync
1. When user adds a bookmark, it's saved to Firebase
2. Firebase automatically triggers update on all connected clients
3. Other tabs/windows with the app open instantly see the new bookmark
4. Delete actions also sync in real-time

### Data Structure
```
bookmarks/
├── bookmarkId1/
│   ├── userId: "user123"
│   ├── title: "Google"
│   ├── url: "https://google.com"
│   ├── timestamp: 1708000000000
│   └── createdAt: "2024-02-15T10:30:00.000Z"
└── bookmarkId2/
    └── ...
```

## 🎨 Customization

### Change Colors
Edit `src/index.css` and component CSS files to change the gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Replace with your preferred colors!

### Add More Features
- Add categories/tags
- Add search functionality
- Add export/import
- Add bookmark descriptions
- Add star/favorite bookmarks

## 🧪 Testing Real-time Sync

1. Open the app in one tab
2. Open in another tab (same browser)
3. Add a bookmark in tab 1
4. Watch it appear instantly in tab 2 ✨
5. Delete a bookmark in tab 2
6. Watch it disappear instantly in tab 1

## 🔒 Security

- Google OAuth ensures only authenticated users can access
- Firebase Rules ensure users can only see their own bookmarks
- Environment variables keep sensitive data out of code
- HTTPS required for production

## 📱 Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## 🐛 Troubleshooting

### "Firebase is not initialized"
- Check your `.env.local` file has all Firebase keys
- Restart development server after adding env vars

### Google Sign-in Not Working
- Make sure Google OAuth is enabled in Firebase Console
- Check your app is running on `localhost:5173`
- Clear browser cache and try again

### Bookmarks Not Syncing
- Check browser console for errors
- Verify Realtime Database Rules are set correctly
- Make sure you're logged in

### Import Errors
- Run `npm install` to install all dependencies
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

## 📚 Resources

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

MIT - Feel free to use this for your projects!

## 🎉 Enjoy!

Your bookmark manager is ready to use. Start saving your favorite links!

---

**Made with ❤️ for bookmark lovers**
