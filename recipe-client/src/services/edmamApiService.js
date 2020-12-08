const APP_ID = "e488ff8f"
const APP_KEY = "922801bd953e0343123e19348ba693fe"
const RECIPE_URL = "https://api.edamam.com/search"


export const findRecipesBySearchKeyword = (queryUrl) =>
    fetch(queryUrl)
        .then(response => response.json())


export default {
    findRecipesBySearchKeyword
}
