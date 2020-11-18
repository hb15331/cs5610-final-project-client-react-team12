import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/js/dist/collapse"
import SearchRecipe from "./SearchRecipe";
import "../styling/HomePageStyle.css"

const APP_ID = "e488ff8f"
const APP_KEY = "922801bd953e0343123e19348ba693fe"
const RECIPE_URL = "https://api.edamam.com/search"

class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        //imageUrl: "https://picsum.photos/200"
        imageUrl: "https://image.shutterstock.com/image-photo/healthy-food-clean-eating-selection-600w-722718097.jpg",
        cuisineTypes: ["American", "Asian", "British", "Caribbean", "Central Europe", "Chinese", "Eastern Europe",
            "French", "Indian", "Italian", "Japanese", "Kosher", "Mediterranean", "Mexican", "Middle Eastern", "Nordic",
            "South American", "South East Asian"],
        ingredients: ["chicken", "pork", "tomatoes", "cheese", "flour", "milk", "potato", "onion", "avocado", "beans",
        "pasta", "pepper", "nuts", "beef", "vegetables", "bread", "egg", "fish"],
        recipeOfTheDay: "",
        rawRecipes: [],
        recipeUri: "",
        random: 0
    }


    componentDidMount() {
        {this.randomGenerator()}
        {this.searchRecipes()}
    }
    

    min = 1;
    max = 18;

    randomGenerator = () => {
        this.setState({random: this.min + (Math.random() * (this.max - this.min))});
        //this.setState({random: 5})
    };



    // fetch a list of recipes that match user's search criteria
    searchRecipes = () => {
        //console.log(this.state.keyword)
        let ingredient = this.state.ingredients[this.state.random]
        //let cuisineType = this.state.cuisineTypes[2]
        //console.log(ingredient, cuisineType)
        const queryUrl = `${RECIPE_URL}?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=1`
        //const queryUrl =
        // `${RECIPE_URL}?q=${this.state.keyword}&app_id=${APP_ID}&app_key=${APP_KEY}&cuisineType="indian"&from=0&to=1`
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

                <nav class="navbar navbar-light">

                    <a className="navbar-brand" href="#">
                        <h1>Foodify</h1>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <li className="nav-item active">
                                    <a className="nav-link" >
                                        <Link to="/register">
                                            <span>Register</span>
                                        </Link>
                                    </a>
                                </li>
                                <a className="nav-link" >
                                    <Link to="/login">
                                        <span>Log In</span>
                                    </Link>
                                </a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" >
                                    <Link to="/profile">
                                        <span>Profile</span>
                                    </Link>
                                </a>
                            </li>
                        </ul>
                    </div>

                </nav>

                <div className="imageStyle">
                    <img className="img-fluid"
                         width="100%"
                         height="auto"
                        src={this.state.imageUrl}
                        alt="randomImage"/>

                </div>

                <div className="row">
                    <div className="col-6">
                        <h1>Recipe of the Day</h1>
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

                                                <h3>{rawRecipe.recipe.label}</h3>

                                                <li className="container">
                                                    {/*{JSON.stringify(rawRecipe)}*/}
                                                    <img src={rawRecipe.recipe.image}/>
                                                </li>

                                            </Link>
                                        </div>
                                    )
                                }
                            )

                        }

                    </div>
                    <div className="col-6">
                        <SearchRecipe/>
                    </div>

                </div>


            </div>

        )
    }
}


export default HomePage;
