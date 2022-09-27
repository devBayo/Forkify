class SearchView {
  #parentEl = document.querySelector('.search');

  getSearchQuery() {
    const searchQuery = this.#parentEl.querySelector('.search__field').value;
    this.#clearSearchField();
    return searchQuery;
  }

  addSearchHandler(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  #clearSearchField() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
