import * as model from './model.js';
import recipeView from './views/recipeViews.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    await model.loadSearchResults('pizza');
    console.log(model.state.search.results);
  } catch (err) {
    console.warn(err.message);
  }
};

controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};
init();
