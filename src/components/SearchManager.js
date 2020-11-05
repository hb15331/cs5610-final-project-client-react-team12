import React from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";

import RecipeDetails from "./RecipeDetails";
import SearchRecipe from "./SearchRecipe";

export class SearchManager extends React.Component {

    render() {
        return (
            <BrowserRouter>

                <div className="container">
                    <h1>Proceed to Recipe Search</h1>
                    <Link to="/recipeSearch">
                        <button>Go</button>
                    </Link>

                    <Route path="/recipeSearch" component={SearchRecipe}/>
                    <Route path="/recipes" component={RecipeDetails}/>
                </div>
            </BrowserRouter>
        );
    }
}
