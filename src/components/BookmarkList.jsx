import BookmarkItem from './BookmarkItem'
import './BookmarkList.css'

function BookmarkList({ bookmarks }) {
  if (bookmarks.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No bookmarks yet</p>
        <p className="subtitle">Start by adding your first bookmark above!</p>
      </div>
    )
  }

  return (
    <div className="bookmark-list-section">
      <h2>Your Bookmarks ({bookmarks.length})</h2>
      <div className="bookmarks-grid">
        {bookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  )
}

export default BookmarkList
