const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////
const showRecipe = async function () {
  try {
    // 1) Loading recipe
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await res.json();
    console.log(res);
    console.log(data);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    console.log(recipe);

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    // 2) Rendering recipe
    const htmlMarkup = `
        <figure class="recipe__fig">
        <img src="${recipe.imageUrl}" alt="${
      recipe.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="icons.21bad73c.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="icons.21bad73c.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="icons.21bad73c.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="icons.21bad73c.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="icons.21bad73c.svg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="icons.21bad73c.svg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map(ingredient => {
            return ` <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="icons.21bad73c.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingredient.quantity || ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>`;
          })
          .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="icons.21bad73c.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', htmlMarkup);
  } catch (err) {
    console.warn(err);
  }
};

showRecipe();
