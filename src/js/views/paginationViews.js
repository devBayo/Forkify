import View from './views';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const totalPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    const currentPage = this._data.currentPage;

    // Page 1 and there are other pages
    if (currentPage === 1 && totalPages > 1) {
      return `
        <button data-goto-page=${
          currentPage + 1
        } class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Last page
    if (currentPage === totalPages && totalPages > 1) {
      return `
        <button data-goto-page=${
          currentPage - 1
        } class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }

    // Other pages
    if (currentPage < totalPages) {
      return `
          <button data-goto-page=${
            currentPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>

          <button data-goto-page=${
            currentPage - 1
          } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
         </button>
    `;
    }

    // Page 1 and no other pages
    return '';
  }

  addPageHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const button = e.target.closest('button');
      if (!button) return;

      const { gotoPage } = button.dataset;
      handler(+gotoPage);
    });
  }
}
export default new PaginationView();
