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
import BlogEntry from "./BlogEntry";

export class SearchManager extends React.Component {

    render() {
            return (
                <div>
                    <BrowserRouter>
                        <div className="container">


                            <Route exact path={["/", "/home", "/search/q=:keyword/" ]} component={HomePage}/>

                            <Route exact path="/register" component={RegisterPage}/>
                            <Route exact path="/login" component={LoginPage}/>
                            <Route exact path="/profile" component={ProfilePage}/>
                            <Route exact path="/profile/:uid" component={PublicProfilePage}/>

                            <Route exact path={["/search"]} component={SearchRecipe}/>
                            <Route exact path={["/search/q=:keyword/:recipeUri", "/details/purchases"]} component={RecipeDetails}/>

                            <Route exact path="/cart" component={orderListContainer}/>
                            <Route exact path="/blogs" component={BlogEntry}/>



                        </div>
                    </BrowserRouter>
                </div>

            );
        }
    }
