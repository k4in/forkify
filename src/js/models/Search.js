import axios from "axios";

/** Search Object creator */
export default class Search {
    constructor(searchQuery) {
        this.searchQuery = searchQuery;
    }
    // API call
    async getResults() {
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.searchQuery}`);
            this.recipes = result.data.recipes;
            //console.log(this.recipes);
        } catch {
            alert("Data not available :(((((");
        }
    }
}
