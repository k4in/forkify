// https://forkify-api.herokuapp.com/api/search?q=pizza

import axios from "axios";
import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

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
    console.log(searchQuery);

    if (searchQuery) {
        // 2) Create Search Object and add to state
        state.search = new Search(searchQuery);

        // 3) Prepare UI for results (clear search input, clear previous results)
        searchView.clearInput();
        searchView.clearResults();

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        searchView.renderResults(state.search.recipes);
    }
}


/** Event Listeners */
elements.searchForm.addEventListener("submit", event => {
    event.preventDefault();
    controlSearch();
});