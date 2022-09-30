import * as model from './model.js';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchViews.js';
import resultsViews from './views/resultsViews.js';
import paginationView from './views/paginationViews.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // render spinner while loading recipe
    recipeView.renderSpinner();

    // update result view(add active tag)
    resultsViews.update(model.loadSearchResultsPerPage());

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
    // 1) Get search query
    const searchQuery = searchView.getSearchQuery();
    if (!searchQuery) return;

    // 2) Load spinner
    resultsViews.renderSpinner();

    // 3) Load search results
    await model.loadSearchResults(searchQuery);

    // 4) Render search results
    resultsViews.render(model.loadSearchResultsPerPage());

    // 5) render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    // handles error
    resultsViews.renderError();
  }
};

const controlPagination = function (page) {
  resultsViews.render(model.loadSearchResultsPerPage(page));
  paginationView.render(model.state.search);
};

const controlRecipeServings = function (newServings) {
  // 1)  Update recipe in the state
  model.updateRecipeServings(newServings);

  // 2) Render the updated recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlUpdateBookmark = function () {
  // Update bookmark in state
  model.updateBookmark();

  // render the updated recipe
  recipeView.update(model.state.recipe);
};

// Subscribers
const init = function () {
  recipeView.addRenderHandler(controlRecipe);
  recipeView.addUpdateServingsHandler(controlRecipeServings);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addPageHandler(controlPagination);
};
init();
