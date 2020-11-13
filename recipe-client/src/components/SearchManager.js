import React from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";

import HomePage from "./HomePage"
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage"
import RecipeDetails from "./RecipeDetails";
import SearchRecipe from "./SearchRecipe";

export class SearchManager extends React.Component {

    render() {
            return (
                <div>
                    <BrowserRouter>
                        <div className="container">
                            <Link to="/home">
                                Home
                            </Link> |
                            <Link to="/register">
                                Sign Up
                            </Link> |
                            <Link to="/login">
                                Log In
                            </Link> |
                            <Link to="/profile">
                                Profile
                            </Link> |
                            <Link to="/recipeSearch">
                                Search Recipe
                            </Link>

                            <Route path="/home" component={HomePage}/>
                            <Route path="/register" component={RegisterPage}/>
                            {/*    <Route path="/login" component={LoginPage}/> */}
                            <Route path="/profile" component={ProfilePage}/>
                            <Route path="/recipeSearch" component={SearchRecipe}/>
                            <Route path="/recipes/:recipeUri" component={RecipeDetails}/>

                        </div>
                    </BrowserRouter>
                </div>

            );
        }
    }
