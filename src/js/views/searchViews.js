class SearchView {
  #parentEl = document.querySelector('.search');

  getSearchQuery() {
    return this.#parentEl.querySelector('.search__field').value;
  }

  addSearchHandler(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  clearSearchField() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
