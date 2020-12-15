import React from 'react'
import {Link, withRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import {RecipeDetails} from "./RecipeDetails";
import edmamApiService from "../services/edmamApiService";

// const APP_ID = "e488ff8f"
// const APP_KEY = "922801bd953e0343123e19348ba693fe"
// const RECIPE_URL = "https://api.edamam.com/search"

const APP_ID = "040971eb"
const APP_KEY = "aa00af86118008cae75d54f7cdded366"
const RECIPE_URL = "https://api.edamam.com/search"


// TODO: Solve a CORS error when we are clicking Search too fast
class SearchRecipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            rawRecipes: [],
            recipeUri: '',
            data: [],
        }
    }

    componentDidMount() {
        /**  Generates the same search results after refresh **/

        if(this.props.match !== undefined) {

            this.setState({
                keyword: this.props.match.params.keyword
            })
            if(this.props.match.params.keyword) {
                this.searchRecipes(this.props.match.params.keyword)
            }
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /** Loads the same search results after refresh or hitting back button **/

        if(this.props.match !== undefined) {
            if(prevProps.match.params.keyword !== this.props.match.params.keyword){
                this.setState({
                    keyword: this.props.match.params.keyword
                })
                if(this.props.match.params.keyword) {
                    this.searchRecipes(this.props.match.params.keyword)
                }
            }
        }



    }

    /** This method encodes the search keyword to the url **/
    searchByKeyword = (keyword) => {

        this.props.history.push(`/search/q=${keyword}/`)

    }

    // fetch a list of recipes that match user's search criteria
    searchRecipes = (keyword) => {

        const queryUrl = `${RECIPE_URL}?q=${keyword}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10`
        edmamApiService.findRecipesBySearchKeyword(queryUrl)
            .then(data => this.setState({
                rawRecipes : data.hits
            }))

    }




    render() {
        return (
            <div>

                <h1>Find a recipe</h1>

                <div className="input-group">

                    <label for="search" className="col-12">Enter keyword</label>

                   <input value={this.state.keyword} onChange={(event) =>

                        this.setState(prevState => ({
                            keyword: event.target.value
                        }))}
                           className="form-control"
                           placeholder="keyword"
                           value={this.state.keyword}
                           id="search"/>

                    <div className="input-group-append">
                        {/*encode the search keyword to url*/}
                        <button className="btn btn-success"
                            onClick={() => this.searchByKeyword(this.state.keyword)}>
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

                                const recipeLabel = encodeURIComponent(rawRecipe.recipe.label)


                                return (
                                    <div key={index}>

                                        <Link to={`/search/q=${this.state.keyword}/${recipeUri}`}>
                                            <li key={recipeUri} className="list-group-item">

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
