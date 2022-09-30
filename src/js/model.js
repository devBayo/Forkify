import { API_URL, RESULT_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultPerPage: RESULT_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };

    const isBookmarked = state.bookmarks.some(
      bookmark => bookmark.id === state.recipe.id
    );

    // Sets bookmarked property to true or false
    state.recipe.bookmarked = isBookmarked;

    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const loadSearchResultsPerPage = function (page = 1) {
  state.search.currentPage = page;

  const start = (page - 1) * state.search.resultPerPage;
  const end = start + state.search.resultPerPage;

  return state.search.results.slice(start, end);
};

export const updateRecipeServings = function (newServings) {
  state.recipe.ingredients.forEach(
    ingredient =>
      (ingredient.quantity =
        (ingredient.quantity * newServings) / state.recipe.servings)
  );

  state.recipe.servings = newServings;
};

export const updateBookmark = function () {
  state.recipe.bookmarked = !state.recipe.bookmarked;

  const bookmarkIndex = state.bookmarks.findIndex(
    bookmark => bookmark.id === state.recipe.id
  );

  if (state.recipe.bookmarked) state.bookmarks.push(state.recipe);
  else state.bookmarks.splice(bookmarkIndex, 1);

  storeBookmark();
};

const storeBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const loadBookmark = function () {
  const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if (storedBookmarks) state.bookmarks = storedBookmarks;
};

loadBookmark();
