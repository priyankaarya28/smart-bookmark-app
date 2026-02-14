import { useState } from 'react'
import { addBookmark, getCurrentUser } from '../firebase'
import './AddBookmark.css'

function AddBookmark() {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validateUrl = (urlString) => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!url.trim() || !title.trim()) {
      setError('Please enter both URL and title')
      return
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)')
      return
    }

    setLoading(true)
    try {
      const user = getCurrentUser()
      if (!user) {
        setError('User not authenticated')
        return
      }

      await addBookmark(user.uid, url.trim(), title.trim())
      setUrl('')
      setTitle('')
      setError('')
    } catch (err) {
      console.error('Add bookmark error:', err)
      setError('Failed to add bookmark. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      if (validateUrl(clipboardText)) {
        setUrl(clipboardText)
      } else {
        setError('Clipboard content is not a valid URL')
      }
    } catch (err) {
      setError('Failed to read clipboard. Please paste manually.')
    }
  }

  return (
    <div className="add-bookmark-section">
      <h2>Add New Bookmark</h2>
      <form onSubmit={handleSubmit} className="add-bookmark-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Bookmark title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL</label>
          <div className="url-input-group">
            <input
              id="url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              className="paste-btn"
              onClick={handlePaste}
              disabled={loading}
              title="Paste from clipboard"
            >
              📋 Paste
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Adding...' : '➕ Add Bookmark'}
        </button>
      </form>
    </div>
  )
}

export default AddBookmark
