import View from './views';
import PreviewViews from './previewViews';
import icons from 'url:../../img/icons.svg';

class BookmarkView extends PreviewViews {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
}
export default new BookmarkView();
