import { API_URL } from './config.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

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

    console.log(state.recipe);
  } catch (error) {
    console.warn(error);
  }
};
