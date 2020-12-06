import React from "react";
import {BrowserRouter, Router, Route, Switch, Link} from "react-router-dom";

import HomePage from "./HomePage"
import registerContainer from "../containers/registerContainer";
import RegisterPage from "./RegisterPage"
import ProfilePage from "./ProfilePage"
import RecipeDetails from "./RecipeDetails";
import SearchRecipe from "./SearchRecipe";
import LoginPage from "./LoginPage";
import orderListContainer from "../containers/OrderListContainer"
import PublicProfilePage from "./PublicProfilePage";
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

                            <Route exact path={["/", "/home", "/recipeSearch/q=:keyword/recipes" ]} component={HomePage}/>
                            <Route exact path="/register" component={RegisterPage}/>
                                <Route exact path="/login" component={LoginPage}/>
                            <Route exact path="/profile" component={ProfilePage}/>

                            <Route exact path="/profile/:uid" component={PublicProfilePage}/>

                            <Route exact path="/recipeSearch" component={SearchRecipe}/>
                            <Route exact path="/recipeSearch/q=:keyword/recipes/:recipeUri" component={RecipeDetails}/>
                            <Route exact path="/cart" component={orderListContainer}/>
                            {/*<Route exact path="/cart" component={orderList}/>*/}


                        </div>
                    </BrowserRouter>
                </div>

            );
        }
    }
