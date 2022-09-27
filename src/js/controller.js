import * as model from './model.js';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchViews.js';
import resultsViews from './views/resultsViews.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

module?.hot?.accept();

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
    // Load spinner
    resultsViews.renderSpinner();

    // Get search query
    const searchQuery = searchView.getSearchQuery();
    if (!searchQuery) return;

    // Load search results
    await model.loadSearchResults(searchQuery);

    // Render search results
    resultsViews.render(model.state.search.results);
  } catch (err) {
    // handles error
    console.warn(err.message);
  }
};

// Subscribers
const init = function () {
  recipeView.addRenderHandler(controlRecipe);
  searchView.addSearchHandler(controlSearchResults);
};
init();
