import axios from "axios";
import { elements } from "../views/base";

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.sourceUrl = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch {   
            console.log("ERROR", error);
            alert("Something went wrong :(");
        }
    }

    calcTime() {
        const numberOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numberOfIngredients / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ["tablespoons", "tablespoon", "ounces", "ounce", "teaspoons", "teaspoon", "cups", "pounds"];
        const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound"];
        const units = [...unitsShort, "kg", "g"];

        const newIngredients = this.ingredients.map(ingr => {
            // 1) Uniform units
            let ingredient = ingr.toLowerCase();
            unitsLong.forEach((element, i) => {
                ingredient = ingredient.replace(element, unitsShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            // 3) Parse ingredients into count, unit and ingredient
            const arrayIngr = ingredient.split(" ");
            const unitIndex = arrayIngr.findIndex(ingrEl => units.includes(ingrEl)); //Returns true or false

            let objIng;
            if (unitIndex > -1) {
                //There is a unit
                const arrCount = arrayIngr.slice(0, unitIndex); //Example 4 1/2 cups, arrCount is [4, 1/2]
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrayIngr[0].replace("-", "+"));
                } else {
                    count = eval(arrayIngr.slice(0, unitIndex).join("+"));
                }

                objIng = {
                    count,
                    unit: arrayIngr[unitIndex],
                    ingredient: arrayIngr.slice(unitIndex + 1).join(" ")
                }
            } else if (+arrayIngr[0]) {
                //There is no unit, but 1st element is a number
                objIng = {
                    count: +arrayIngr[0],
                    unit: "",
                    ingredient: arrayIngr.slice(1).join(" "),
                };
            } else if (unitIndex === -1) {
                //There is no unit, and no number in 1st position
                objIng = {
                    count: 1,
                    unit: "",
                    ingredient
                };
            }
            
            return objIng;
        });
        this.ingredients = newIngredients;
    }
};