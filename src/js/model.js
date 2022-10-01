import { API_KEY, API_URL, RESULT_PER_PAGE } from './config.js';
import { getJSON, sendJSON } from './helper.js';

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

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    state.recipe = createRecipeObject(data);

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

const loadStoredBookmark = function () {
  const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if (storedBookmarks) state.bookmarks = storedBookmarks;
};

loadStoredBookmark();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) {
          throw new Error(
            'Wrong ingredient Format! Please use the correct Format :)'
          );
        }

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      cooking_time: newRecipe.cookingTime,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
      ingredients,
    };
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
  } catch (err) {
    throw err;
  }
};
