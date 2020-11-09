import React from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";

import RecipeDetails from "./RecipeDetails";
import SearchRecipe from "./SearchRecipe";

export class SearchManager extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Link to="/recipeSearch">
                       Search Recipe
                    </Link>

                    <Route path="/recipeSearch" component={SearchRecipe}/>
                    <Route path="/recipes/:recipeUri" component={RecipeDetails}/>
                </div>
            </BrowserRouter>
        );
    }
}
