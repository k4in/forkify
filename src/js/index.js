// https://forkify-api.herokuapp.com/api/search?q=pizza

import axios from "axios";
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}


/** Search Controller */
const controlSearch = async () => {
    // 1) Get query from searchView
    const searchQuery = searchView.getInput();

    if (searchQuery) {
        // 2) Create Search Object and add to state
        state.search = new Search(searchQuery);

        // 3) Prepare UI for results (clear search input, clear previous results, render loader)
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.recipes);
        } catch (error) {
            alert("Something went wrong with the search!");
            clearLoader();
        }

    }
}


/** Recipe Controller */
const controlRecipe = async () => {

    // 1) Get ID from URL / Hashtag
    const id = window.location.hash.replace("#", ""); //Get id from Hashtag, remove the # from string.

    if (id) {
        // 2) Create new recipe object
        state.recipe = new Recipe(id);

        // 3) prepare UI for changes

        try {
            // 4) Get Recipe data
            await state.recipe.getRecipe();

            // 5) Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 6) Render recipe
            console.log(state.recipe);
        } catch (error) {
            alert("Error processing recipe!");
        }

    }
    
}


/** Event Listeners */
elements.searchForm.addEventListener("submit", event => {
    event.preventDefault();
    controlSearch();
});

elements.searchResultsButtonArea.addEventListener("click", event => {
    const btn = event.target.closest(".btn-inline");
    if (btn) {
        const goToPage = +btn.dataset.goto;
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    }
});

["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipe)); //Adding different events to the same object with foreach loop.