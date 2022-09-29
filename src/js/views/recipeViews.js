import View from './views.js';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = "We couldn't find that recipe. Please try another one!";
  _message;

  renderMessage(message = this._message) {
    const markup = `<div class="message">
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

  addRenderHandler(handler) {
    // show event on load && hashchange event
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  addUpdateServingsHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--tiny');
      if (!button) return;
      const newServings = +button.dataset.newServings;
      handler(newServings);
    });
  }

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
      <img src="${this._data.imageUrl}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button data-new-servings=${
            this._data.servings > 1
              ? this._data.servings - 1
              : this._data.servings
          } class="btn--tiny btn--decrease-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-new-servings=${
            this._data.servings + 1
          } class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this._data.ingredients.map(this._generateIngredientMarkup).join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
  }

  _generateIngredientMarkup(ingredient) {
    return ` <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ingredient.quantity ? new Fraction(ingredient.quantity) : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ingredient.unit}</span>
      ${ingredient.description}
    </div>
  </li>`;
  }
}

export default new RecipeView();
