import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

const APP_ID = "e488ff8f"
const APP_KEY = "922801bd953e0343123e19348ba693fe"
const RECIPE_URL = "https://api.edamam.com/search"


class SearchRecipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            rawRecipes: []
        }
    }


    // fetch a list of recipes that match user's search criteria
    searchRecipe = () => {
        //console.log(this.state.keyword)
        const queryUrl = `${RECIPE_URL}?q=${this.state.keyword}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=5`
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
                <h1>PROTOTYPE</h1>
                <h3>Edamam API</h3>
                <p>Put text about Edamam</p>
                <h3>Search Criteria</h3>
                <p>Using the Edamam api, users can search for recipes using ingredients as keywords.....
                    then talk about how the REST API works</p>
                <h3>Search Results</h3>
                <p>The search will produce a list that shows the names of recipes with the use of the search keyword.
                    Clicking on the list item will navigate the user to a page that shows a more detailed information
                    about the recipe.</p>
                <h5>Proceed to Recipe Search</h5>
                <h2>Search Recipes</h2>

                <div className="input-group">

                    <input onChange={(event) =>
                        //console.log(event.target.value)
                        this.setState(prevState => ({
                            //...prevState,
                            keyword: event.target.value
                        }))}
                           className="form-control"
                           placeholder="keyword"
                           value={this.state.keyword}/>

                    <div className="input-group-append">
                        <button
                            onClick={this.searchRecipe}
                            className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </div>

                <ul className="list-group mt-3">
                {
                    this.state.rawRecipes.map(
                        (rawRecipe, index) =>
                            <div>
                                <Link to={`/recipes/${rawRecipe.recipe.label}`}>
                            <li key={index} className="list-group-item">
                                {/*{JSON.stringify(rawRecipe)}*/}

                                {rawRecipe.recipe.label}

                            </li>
                                </Link>

                            </div>
                    )
                }
                </ul>

            </div>

        )
    }
}


export default SearchRecipe;