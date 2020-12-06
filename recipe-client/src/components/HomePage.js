import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/js/dist/collapse"
import SearchRecipe from "./SearchRecipe";
import "../styling/HomePageStyle.css"
import {connect} from "react-redux";
import UserActions from "../actions/UserActions";
import OrderActions from "../actions/OrderActions"

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
        selectedIngredient: "",
        recipeOfTheDay: "",
        rawRecipes: [],
        recipeUri: "",
        random: 0,
        latestOrd: []
    }


    componentDidMount() {
        {this.randomGenerator()}
        {this.searchRecipes()}
        {this.props.profile()}
        {this.props.findAllUsers()}
        if(this.props.currentUser != null){
            const customerId = this.props.currentUser.userId
            {this.props.findOrderForUser(customerId)}
        }
        if(this.props.allOrders != null) {
            {
                this.props.findAllOrders()
            }
        }

    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.currentUser !== null) {
    //         const customerId = this.props.currentUser.userId
    //         if (customerId !== this.props.customerId) {
    //             {
    //                 this.props.findOrderForUser(customerId)
    //             }
    //         }
    //     }
    // }

    min = 1;
    max = 18;

    randomGenerator = () => {
        this.setState({random: this.min + (Math.random() * (this.max - this.min))});
        //this.setState({random: 5})
    };

    // fetch a list of recipes that match user's search criteria
    searchRecipes = () => {
        let ingredient = this.state.ingredients[8]

        this.state.selectedIngredient = ingredient
        //let cuisineType = this.state.cuisineTypes[2]
        //console.log(ingredient, cuisineType)
        const queryUrl = `${RECIPE_URL}?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=4&to=5`
       // const queryUrl =
        // `${RECIPE_URL}?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&cuisineType="Indian"&from=0&to=1`
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

    // current logged in user is not allowed to login or register again unless log out first
    blockLoginOrRegister = (e) => {
        if (this.props.currentUser) {
            alert("ERROR: You are already logged in!")
            e.preventDefault()
        }
    }



    render() {
        return (
            <div>
                {this.props.currentUser &&
                <nav class="navbar navbar-light">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <a className="navbar-brand" href="#">
                        <h1>Foodify</h1>
                    </a>

                    <h5>WELCOME {this.props.currentUser ? this.props.currentUser.username : "anonymous"}

                    </h5>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <li className="nav-item active">
                                    <a className="nav-link" >
                                        <Link to="/register" onClick={(e) => this.blockLoginOrRegister(e)}>
                                            Register
                                        </Link>
                                    </a>
                                </li>
                                <a className="nav-link" >
                                    <Link to="/login" onClick={(e) => this.blockLoginOrRegister(e)}>
                                        Log In
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
                            <li className="nav-item active">
                                <a className="nav-link" >
                                    <Link to="/cart">
                                        <span>Orders</span>
                                    </Link>
                                </a>
                            </li>
                        </ul>
                    </div>

                </nav>
                }

                {!this.props.currentUser &&
                <nav class="navbar navbar-light">

                    <a className="navbar-brand" href="#">
                        <h1>Foodify</h1>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <h5>Current user:
                        {this.props.currentUser ? this.props.currentUser.username : "anonymous"}
                    </h5>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <li className="nav-item active">
                                    <a className="nav-link" >
                                        <Link to="/register" onClick={(e) => this.blockLoginOrRegister(e)}>
                                            Register
                                        </Link>
                                    </a>
                                </li>
                                <a className="nav-link" >
                                    <Link to="/login"
                                          onClick={(e) => this.blockLoginOrRegister(e)}>
                                        Log In
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
                }

                <div className="imageStyle">
                    <img className="img-fluid"
                         width="100%"
                         height="20%"
                        src={this.state.imageUrl}
                        alt="randomImage"/>

                </div>

                {this.props.currentUser &&
                this.props.currentUser.type === "CUSTOMER" &&
                    //TODO:Need to make sure to check which user...if deliverer...change to most recent delivery query
                    <div className="row">
                    <div className="col-6">
                    <h1>Recent Orders:</h1>
                    <p>Length:{this.props.orders.length}</p>

                    {/*diplay most recent order for the user*/}
                        {this.props.orders.map((order =>
                        <li>{order.items}</li>))}

                    {/*<p>{this.props.orders[this.props.orders.length - 1].items}</p>*/}

                    <h1>Recipe of the Day</h1>

                    {
                        this.state.rawRecipes.map(
                            (rawRecipe, index) => {
                                // extract uri from data and use it as the unique identifier of recipe
                                const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)

                                return (
                                    <div key={index}>
                                        <Link to={`/recipes/${recipeUri}`}>

                                            <h3>{rawRecipe.recipe.label}</h3>

                                            <li className="container">
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

                }

                {this.props.currentUser &&
                this.props.currentUser.type === "DELIVERER" &&
                //TODO:Need to make sure to check which user...if deliverer...change to most recent delivery query
                <div className="row">
                    <div className="col-6">
                        <h1>Recent Orders For Delivery:</h1>
                        <p>Length:{this.props.orders.length}</p>
                        {/*diplay most recent order for the user*/}
                        {/*<p>{this.props.orders[this.props.orders.length - 1].items}</p>*/}

                        {/*<h1>Recipe of the Day</h1>*/}

                        {/*{*/}
                        {/*    this.state.rawRecipes.map(*/}
                        {/*        (rawRecipe, index) => {*/}
                        {/*            // extract uri from data and use it as the unique identifier of recipe*/}
                        {/*            const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)*/}
                        {/*            // console.log(recipeUri)*/}

                        {/*            return (*/}
                        {/*                <div key={index}>*/}
                        {/*                    /!*<Link to={`/recipes/${rawRecipe.recipe.label}`}>*!/*/}
                        {/*                    <Link to={`/recipes/${recipeUri}`}>*/}

                        {/*                        <h3>{rawRecipe.recipe.label}</h3>*/}

                        {/*                        <li className="container">*/}
                        {/*                            /!*{JSON.stringify(rawRecipe)}*!/*/}
                        {/*                            <img src={rawRecipe.recipe.image}/>*/}
                        {/*                        </li>*/}

                        {/*                    </Link>*/}
                        {/*                </div>*/}
                        {/*            )*/}
                        {/*        }*/}
                        {/*    )*/}

                        {/*}*/}

                    </div>
                    <div className="col-6">
                        <SearchRecipe/>
                    </div>

                </div>

                }


                {!this.props.currentUser &&
                //TODO:Need to make sure to check which user...if deliverer...change to most recent delivery query
                <div className="row">
                    <div className="col-6">

                        <h1>Today's pick</h1>


                        <h1>Recipe of the Day</h1>


                        {
                            this.state.rawRecipes.map(
                                (rawRecipe, index) => {
                                    // extract uri from data and use it as the unique identifier of recipe
                                    const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)

                                    return (
                                        <div key={index}>

                                            {/*<Link to={`/recipeSearch/q=${this.state.selectedIngredient}/recipes/${recipeUri}`}>*/}

                                            {/*<Link to={`/recipes/${rawRecipe.recipe.label}`}>*/}
                                            <Link to={`/search/q=${this.state.selectedIngredient}/recipes/${recipeUri}`}>


                                                <h3>{rawRecipe.recipe.label}</h3>

                                                <li className="container">
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
                        <h1>Latest Recipe purchased:</h1>

                        {this.props.allOrders.map((ord) =>
                                //TODO:figure out how to obtain just the latest orders, not the whole list
                        <div>
                            {(this.state.latestOrd.includes(ord.name) === false) &&
                                <div>{this.state.latestOrd.push(ord.name)}</div>

                            }
                        </div>
                        )}
                        <p>{this.state.latestOrd[this.state.latestOrd.length-1]}</p>
                        {/*<p>{this.props.allOrders[this.props.allOrders.length-1].name} by {this.props.allOrders[this.props.allOrders.length-1].username}</p>*/}
                        <SearchRecipe/>
                    </div>

                </div>

                }
            </div>

        )
    }
}

const stateToPropertyMapper = (state) => ({
    currentUser: state.UserReducer.currentUser,
    order: state.orderReducer.order,
    orders: state.orderReducer.orders,
    user: state.UserReducer.user,
    users: state.UserReducer.users,
    allOrders: state.orderReducer.allOrders
})

const propertyToDispatchMapper = (dispatch) => ({
    profile: () => UserActions.profile(dispatch),
    findOrderForUser: (customerId) => OrderActions.findOrderForUser(dispatch,customerId),
    findAllUsers: () => UserActions.findAllUsers(dispatch),
    findAllOrders: () => OrderActions.findAllOrders(dispatch)
})

export default connect(stateToPropertyMapper, propertyToDispatchMapper)(HomePage)
