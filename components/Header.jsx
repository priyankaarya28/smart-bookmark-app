import { signOutUser } from '../firebase'
import './Header.css'

function Header({ user }) {
  const handleSignOut = async () => {
    try {
      await signOutUser()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>📚 Smart Bookmark</h1>
        </div>
        {user && (
          <div className="header-user">
            <img 
              src={user.photoURL} 
              alt={user.displayName}
              className="user-avatar"
              title={user.displayName}
            />
            <span className="user-name">{user.displayName}</span>
            <button className="signout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
