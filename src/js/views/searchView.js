//Importing DOM elements
import { elements } from "./base";

//function to get Search Input
export const getInput = () => elements.searchInput.value;

//function to clear search input field
export const clearInput = () => {
    elements.searchInput.value = ""; 
};

//function to clear previus results
export const clearResults = () => {
    elements.searchResultsList.innerHTML = ""; //Clear search REsults
    elements.searchResultsButtonArea.innerHTML = ""; // Clear Buttons
};

//shorten too long Recipe titles
const limitRecipeTitle = (recipeTitle, limit = 15) => {
    const newRecipeTitle = new Array();
    if (recipeTitle.length > limit) {
        recipeTitle.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newRecipeTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        //return the result
        return `${newRecipeTitle.join(" ")} ...`;
    } 
    return recipeTitle;
};

//callback function to render a single recipe box on the left side.
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultsList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) => {

    const buttonElement = `
        <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1}>
            <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
            </svg>
        </button>
    `;
    elements.searchResultsButtonArea.insertAdjacentHTML(type === "prev" ? "afterbegin" : "beforeend", buttonElement);
}

//Rendering buttons for search results
const renderButtons = (page, numberOfResults, resultsPerPage) => {
    const pages = Math.ceil(numberOfResults / resultsPerPage);

    if (page === 1 && pages > 1) {
        //Button to go to next page
        createButton(page, "next");
    } else if (page === pages && pages > 1) {
        //Button to go to previous page
        createButton(page, "prev");
    } else {
        //Both buttons
        createButton(page, "next");
        createButton(page, "prev");
    }
};

//function to create search results in the left site of page
export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    //render results of current page
    const start = ((page - 1) * resultsPerPage);
    const end = page * resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    //Render pagination buttons
    renderButtons(page, recipes.length, resultsPerPage);
};
