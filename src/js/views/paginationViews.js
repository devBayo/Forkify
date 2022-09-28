import View from './views';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const totalPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    console.log(totalPages);

    // Page 1 and there are other pages
    if (this._data.currentPage === 1 && totalPages > 1) {
      return 'Page 1 and other pages';
    }
    // Page 1 and no other pages
    if (this._data.currentPage === totalPages && totalPages === 1) {
      return 'Page 1 only';
    }
    // Last page
    if (this._data.currentPage === totalPages && totalPages > 1) {
      return 'Last Page';
    }

    // Other pages
    if (this._data.currentPage < totalPages) {
      return 'Other pages';
    }

    // return totalPages;
  }
}
export default new PaginationView();
