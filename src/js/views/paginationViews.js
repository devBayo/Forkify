import View from './views';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
}
export default new PaginationView();
