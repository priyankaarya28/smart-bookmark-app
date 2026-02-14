import { useState, useEffect } from 'react'
import Login from './components/Login'
import BookmarkList from './components/BookmarkList'
import AddBookmark from './components/AddBookmark'
import Header from './components/Header'
import { subscribeToAuthState, subscribeToUserBookmarks, isConfigured } from './firebase'

// DEMO MODE - Set this to true to see the UI without Firebase
const DEMO_MODE = !isConfigured()

function App() {
  const [user, setUser] = useState(DEMO_MODE ? { uid: 'demo-user', displayName: 'Demo User', photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=667eea&color=fff' } : null)
  const [bookmarks, setBookmarks] = useState(DEMO_MODE ? [
    { id: 'demo1', title: 'Google', url: 'https://google.com', timestamp: Date.now() - 3600000, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: 'demo2', title: 'GitHub', url: 'https://github.com', timestamp: Date.now() - 1800000, createdAt: new Date(Date.now() - 1800000).toISOString() },
    { id: 'demo3', title: 'ChatGPT', url: 'https://chatgpt.com', timestamp: Date.now(), createdAt: new Date().toISOString() }
  ] : [])
  const [loading, setLoading] = useState(false)
  const [configError, setConfigError] = useState(false)
  let bookmarkUnsubscribe = null

  // Check if Firebase is configured
  useEffect(() => {
    if (!isConfigured() && !DEMO_MODE) {
      setConfigError(true)
      setLoading(false)
      return
    }
  }, [])

  // Subscribe to auth state
  useEffect(() => {
    if (DEMO_MODE) {
      setLoading(false)
      return
    }

    if (!isConfigured()) return

    const unsubscribe = subscribeToAuthState((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Subscribe to bookmarks when user logs in
  useEffect(() => {
    if (DEMO_MODE) return

    if (user) {
      bookmarkUnsubscribe = subscribeToUserBookmarks(user.uid, setBookmarks)
    } else {
      setBookmarks([])
    }

    return () => {
      if (bookmarkUnsubscribe) {
        bookmarkUnsubscribe()
      }
    }
  }, [user])

  if (configError && !DEMO_MODE) {
    return (
      <div className="error-container">
        <div className="error-card">
          <h1>⚙️ Configuration Required</h1>
          <p>Firebase is not configured. Please follow these steps:</p>
          <ol>
            <li>Create a Firebase project at <strong>https://console.firebase.google.com/</strong></li>
            <li>Enable Google Authentication</li>
            <li>Create a Realtime Database</li>
            <li>Create a <strong>.env.local</strong> file in your project root</li>
            <li>Add your Firebase credentials from the project settings</li>
          </ol>
          <p><strong>Template for .env.local:</strong></p>
          <pre>
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
          </pre>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            After adding .env.local, save the file and refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
          </p>
          <a href="/" style={{ marginTop: '1rem', display: 'inline-block', color: '#667eea', textDecoration: 'underline' }}>
            Refresh Page
          </a>
        </div>
        <style>{`
          body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .error-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 1rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .error-card {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }
          .error-card h1 {
            color: #333;
            margin-bottom: 1rem;
            font-size: 1.8rem;
          }
          .error-card p {
            color: #666;
            margin-bottom: 1rem;
            line-height: 1.6;
          }
          .error-card ol {
            color: #666;
            margin-left: 1.5rem;
            margin-bottom: 1.5rem;
            line-height: 1.8;
          }
          .error-card li {
            margin-bottom: 0.5rem;
          }
          .error-card pre {
            background: #f5f5f5;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 0.85rem;
            border: 1px solid #ddd;
            color: #333;
          }
          .error-card strong {
            color: #333;
          }
        `}</style>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="app">
      {DEMO_MODE && (
        <div style={{
          background: '#ffc107',
          color: '#333',
          padding: '0.75rem',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          borderBottom: '2px solid #ff9800'
        }}>
          📝 DEMO MODE - This is a preview of the app UI. To use with real Firebase, add your credentials to .env.local and refresh.
        </div>
      )}
      <Header user={user} />
      {user ? (
        <main className="main-content">
          <div className="bookmarks-container">
            <AddBookmark />
            <BookmarkList bookmarks={bookmarks} />
          </div>
        </main>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
