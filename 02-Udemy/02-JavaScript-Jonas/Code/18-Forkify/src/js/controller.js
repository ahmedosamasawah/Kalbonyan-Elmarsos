import 'core-js/stable';
import * as model from './model.js';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SECONDS } from './config';
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
// import * as MODAL_CLOSE_SECONDS from './config';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

///////////////////////////////////////
// FROM PARCEL:
// model.hot && model.hot.accept();

// We want to receive recipes in an asynchronous way from the API:
const controlRecipes = async () => {
  // TRY and CATCH:
  try {
    // generating id from Window:
    const id = window.location.hash.slice(1);

    // Updatinging Search Results:
    resultsView.update(model.getSearchResultsPage());

    // our Gard:
    if (!id) return;

    // Spinner effect:
    recipeView.renderSpinner();

    // Loading Recipe:
    await model.loadRecipe(id);

    // Rendering Recipe:
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    // Rendering Spinner for Search Results:
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    // Rendering Search Results:
    resultsView.render(model.getSearchResultsPage());

    // Rendering Pagination:
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = goToPage => {
  // Rendering NEW Search Results:
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Rendering New Pagination:
  paginationView.render(model.state.search);
};

const controlServings = newServings => {
  // Updating Servings Count:
  model.updateServings(newServings);

  // Updating NEW Recipe:
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  !model.state.recipe.bookmarked
    ? model.addBookmark(model.state.recipe)
    : model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async newRecipe => {
  try {
    // Showing Render Spinner:
    addRecipeView.renderSpinner();

    // Uploading NEW recipe:
    await model.uploadRecipe(newRecipe);

    // Renderind NEW recipe
    recipeView.render(model.state.recipe);

    // Displaying Seccess Message:
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close Form Window after 2500 SECS:
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SECONDS);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = () => {
  addRecipeView.addHandlerUploadForm(controlAddRecipe);
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
