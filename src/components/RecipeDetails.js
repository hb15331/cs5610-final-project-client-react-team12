import React from "react"

const APP_ID = "e488ff8f"
const APP_KEY = "922801bd953e0343123e19348ba693fe"
const RECIPE_URL = "https://api.edamam.com/search"

// https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_b79327d05b8e5b838ad6cfd9576b30b6&app_id=e488ff8f&app_key=922801bd953e0343123e19348ba693fe


export class RecipeDetails extends React.Component {

    state = {
        recipe: {}
    }

    componentDidMount() {
        // retrieve the uri from url
        const recipeUri = this.props.match.params.recipeUri
        const queryUrl = `${RECIPE_URL}?r=${recipeUri}&app_id=${APP_ID}&app_key=${APP_KEY}`

        // findRecipeById
        fetch(queryUrl)
            .then(response => response.json())
            .then(recipe => this.setState(preState => ({
                ...preState, recipe: recipe[0]
            })))
    }


    render() {
        return (
            <div className="container">
                <h1>Details Page</h1>
                <p>{this.state.recipe.label}</p>
                <img src={this.state.recipe.image}/>
                {/*{JSON.stringify(this.state.recipe)}*/}
            </div>
        )
    }
}


export default RecipeDetails