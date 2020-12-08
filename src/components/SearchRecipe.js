import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

const APP_ID = "e488ff8f"
const APP_KEY = "922801bd953e0343123e19348ba693fe"
const RECIPE_URL = "https://api.edamam.com/search"

// TODO: Solve a CORS error when we are clicking Search too fast
class SearchRecipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            rawRecipes: []
        }
    }


    // fetch a list of recipes that match user's search criteria
    searchRecipes = () => {
        //console.log(this.state.keyword)
        const queryUrl = `${RECIPE_URL}?q=${this.state.keyword}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10`
        fetch(queryUrl)
            .then(response => response.json())
            .then((data) => this.renderRecipes(data))
            //.then(this.renderRecipes)

    }


    // data includes all the info retrieved from api
    renderRecipes = (data) =>
        this.setState(prevState => ({
            //...prevState,
            // hits is an array of objects that include the true recipes we want
            rawRecipes: data.hits
        }))
        //console.log(data)


    render() {
        return (
            <div>

                <h1>Find a recipe</h1>
                {/* <h5>Choose an ingredient</h5> */}

                <div className="input-group">

                    <label for="search" className="col-12">Enter keyword</label>
                    <input onChange={(event) =>
                        //console.log(event.target.value)
                        this.setState(prevState => ({
                            //...prevState,
                            keyword: event.target.value
                        }))}
                           className="form-control"
                           placeholder="keyword"
                           value={this.state.keyword}
                            id="search"/>

                    <div className="input-group-append">
                            <button
                                onClick={this.searchRecipes}
                                className="btn btn-primary">
                                Search
                            </button>
                    </div>
                </div>

                <ul className="list-group mt-3">
                {
                    this.state.rawRecipes.map(
                        (rawRecipe, index) => {
                            // extract uri from data and use it as the unique identifier of recipe
                            const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)
                            // console.log(recipeUri)

                            return (
                                <div key={index}>
                                    {/*<Link to={`/recipes/${rawRecipe.recipe.label}`}>*/}
                                    <Link to={`/recipes/${recipeUri}`}>
                                        <li className="list-group-item">
                                            {/*{JSON.stringify(rawRecipe)}*/}
                                            {rawRecipe.recipe.label}
                                        </li>
                                    </Link>
                                </div>
                            )
                        }
                    )
                }
                </ul>

            </div>

        )
    }
}



export default SearchRecipe;