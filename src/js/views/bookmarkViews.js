import PreviewViews from './previewViews';

class BookmarkView extends PreviewViews {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addLoadBookmarkHandler(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarkView();
