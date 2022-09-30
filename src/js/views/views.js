import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    // checks if data is from search field then short circuit if data is empty
    if (Array.isArray(data) && data.length === 0) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (Array.isArray(data) && data.length === 0) return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDOM.querySelectorAll('*');
    console.log(newElements);
  }

  renderSpinner() {
    const spinner = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> 
  `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', spinner);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
