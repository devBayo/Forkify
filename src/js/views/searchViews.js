class SearchView {
  #parentEl = document.querySelector('.search');

  getSearchQuery() {
    return this.#parentEl.querySelector('.search__field').value;
  }

  addHandlerRender(handler) {
    this.#parentEl
      .querySelector('.search__btn')
      .addEventListener('click', function (e) {
        e.preventDefault();
        handler();
      });
  }

  clearSearchField() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
