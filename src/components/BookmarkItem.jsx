import { useState } from 'react'
import { deleteBookmark } from '../firebase'
import './BookmarkItem.css'

function BookmarkItem({ bookmark }) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this bookmark?')) {
      return
    }

    setDeleting(true)
    setError('')
    try {
      await deleteBookmark(bookmark.id)
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete bookmark')
      setDeleting(false)
    }
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return 'Just now'
    }
  }

  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return 'link'
    }
  }

  return (
    <>
      <div
        className={`bookmark-item ${deleting ? 'deleting' : ''}`}
        style={{
          opacity: deleting ? 0.5 : 1,
          pointerEvents: deleting ? 'none' : 'auto',
        }}
      >
        <div className="bookmark-header">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bookmark-title"
          >
            {bookmark.title}
          </a>
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={deleting}
            title="Delete bookmark"
          >
            ✕
          </button>
        </div>

        <div className="bookmark-url">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="url-text"
          >
            🔗 {getDomain(bookmark.url)}
          </a>
        </div>

        <div className="bookmark-footer">
          <span className="bookmark-date">
            📅 {formatDate(bookmark.createdAt)}
          </span>
        </div>

        {error && <div className="error-small">{error}</div>}
      </div>
    </>
  )
}

export default BookmarkItem
