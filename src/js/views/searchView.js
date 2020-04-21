//Importing DOM elements
import { elements } from "./base";

//function to get Search Input
export const getInput = () => elements.searchInput.value;

//function to clear search input field
export const clearInput = () => {
    elements.searchInput.value = ""; 
}

//function to clear previus results
export const clearResults = () => {
    elements.searchResultsList.innerHTML = "";
}

//shorten too long Recipe titles
const limitRecipeTitle = (recipeTitle, limit = 17) => {
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
}

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

//function to create search results in the left site of page
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);        
};
