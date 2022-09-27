class SearchView {
  _parentEl = document.querySelector('.search');

  getSearchQuery() {
    const searchQuery = this._parentEl.querySelector('.search__field').value;
    this._clearSearchField();
    return searchQuery;
  }

  addSearchHandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearSearchField() {
    this._parentEl.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
