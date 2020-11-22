import React from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";

import HomePage from "./HomePage"
import RegisterPage from "./RegisterPage";
import registerContainer from "../containers/registerContainer";
import ProfilePage from "./ProfilePage"
import RecipeDetails from "./RecipeDetails";
import SearchRecipe from "./SearchRecipe";
import LoginPage from "./LoginPage";

export class SearchManager extends React.Component {

    render() {
            return (
                <div>
                    <BrowserRouter>
                        <div className="container">
                            {/*<Link to="/home">*/}
                            {/*    Home*/}
                            {/*</Link> |*/}
                            {/*<Link to="/register">*/}
                            {/*    Sign Up*/}
                            {/*</Link> |*/}
                            {/*/!*<Link to="/login">*!/*/}
                            {/*/!*</Link>*!/*/}
                            {/*<Link to="/profile">*/}
                            {/*    Profile*/}
                            {/*</Link> |*/}
                            {/*<Link to="/recipeSearch">*/}
                            {/*    Search Recipe*/}
                            {/*</Link>*/}

                            <Route exact path={["/", "/home" ]} component={HomePage}/>
                            <Route excat path="/register" component={registerContainer}/>
                                <Route exact path="/login" component={LoginPage}/>
                            <Route exact path="/profile" component={ProfilePage}/>
                            <Route exact path="/recipeSearch" component={SearchRecipe}/>
                            <Route exact path="/recipes/:recipeUri" component={RecipeDetails}/>

                        </div>
                    </BrowserRouter>
                </div>

            );
        }
    }
