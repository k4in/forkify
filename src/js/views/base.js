export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchResults: document.querySelector(".results"),
    searchResultsList: document.querySelector(".results__list"),
    searchResultsButtonArea: document.querySelector(".results__pages"),
    recipeBox: document.querySelector(".recipe")
};

export const elementStrings = {
    loader: "loader"
};

export const renderLoader = parent => { //passing the parent DOM element, so it can be reused in different places
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="./img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};