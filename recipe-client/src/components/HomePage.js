import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/js/dist/collapse"
import SearchRecipe from "./SearchRecipe";
import "../styling/HomePageStyle.css"
import {connect} from "react-redux";
import UserActions from "../actions/UserActions";
import OrderActions from "../actions/OrderActions"
import edmamApiService from "../services/edmamApiService";
import UserService from "../services/UserService";

const APP_ID = "e488ff8f"
const APP_KEY = "922801bd953e0343123e19348ba693fe"
const RECIPE_URL = "https://api.edamam.com/search"

class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {

        imageUrl: "https://image.shutterstock.com/image-photo/healthy-food-clean-eating-selection-600w-722718097.jpg",
        ingredients: ["chicken", "pork", "tomatoes", "cheese", "flour", "milk", "potato", "onion", "avocado", "beans",
        "pasta", "pepper", "nuts", "beef", "vegetables", "bread", "egg", "fish"],
        selectedIngredient: "",
        rawRecipes: [],
        recipeUri: "",
        randomRecipes: [],
        latestOrd: "",
        currentUser: {}
    }


    componentDidMount() {

        // generate recipe of the day - new addition
        console.log("From home page:", this.props)
        if(this.props.currentUser === null){
            this.setState({
                currentUser: {
                    userId: "000",
                    username: "anonymous"
                }
            })
        }

        if(this.state.currentUser !== null){
            {this.searchRecipes()}
        }



        {this.props.profile()}
        {this.props.findAllUsers()}
        if(this.props.currentUser != null){
            const customerId = this.props.currentUser.userId
            {this.props.findOrderForUser(customerId)}
        }
            {
                this.props.findAllOrders()
            }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }




    // fetch a list of recipes that match user's search criteria
    searchRecipes = () => {
        let random = Math.floor(Math.random() * 18)
        let ingredient = this.state.ingredients[random]
        this.state.selectedIngredient = ingredient

        const queryUrl = `${RECIPE_URL}?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=4&to=5`

        edmamApiService.findRecipesBySearchKeyword(queryUrl)
            .then(data => this.setState({
                randomRecipes : data.hits
            }))

    }

    logout = () =>
        UserService.logout()
            .then(status => {
                // TODO: async function called in another async
                this.props.profile()
                this.props.history.push('/')
            })



    // current logged in user is not allowed to login or register again unless log out first
    blockLoginOrRegister = (e) => {
        if (this.props.currentUser) {
            alert("ERROR: You are already logged in!")
            e.preventDefault()
        }
    }



    render() {
        return (
            <div className="container-fluid">
                {this.props.currentUser &&
                <nav class="navbar navbar-light">


                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">


                        <span >
                            <h1 className="homepage-header">
                                Foodify
                            </h1>
                            <h6 className="font-italic">Bringing meals to your doors</h6>
                            </span>

                    </a>



                    <h5>Welcome {this.props.currentUser ? this.props.currentUser.username : "anonymous"}</h5>


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
                            <li className="nav-item active">
                                {this.props.currentUser &&
                                <Link to={"/"}>
                                <a onClick={this.logout}
                                    className="nav-link">
                                    <span>Logout</span>
                                </a>
                                </Link>
                                }
                            </li>
                        </ul>
                    </div>

                </nav>
                }

                {!this.props.currentUser &&
                <nav class="navbar navbar-light">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <a className="navbar-brand" href="#">
                        <span >
                            <h1 className="homepage-header">
                                Foodify
                            </h1>
                            <h6 className="font-italic">Bringing meals to your doors</h6>
                            </span>
                    </a>


                    <h5>WELCOME
                        {this.props.currentUser ? this.props.currentUser.username : ""}
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
                    <div>
                <div class="container-fluid d-none d-md-block">
                    <div className="row">
                    <div className="col-6">
                    <h1>Recent Orders:</h1>


                    {/*diplay most recent order for the user*/}
                        {this.props.orders.map((order =>
                        <li>{order.items}</li>))}


                    <h1>Today's pick</h1>

                    {
                        this.state.randomRecipes.map(
                            (rawRecipe, index) => {
                                // extract uri from data and use it as the unique identifier of recipe
                                const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)

                                return (
                                    <div key={index}>
                                        <Link to={`/search/q=${this.state.selectedIngredient}/${recipeUri}`}>

                                            <h3>{rawRecipe.recipe.label}</h3>
                                                <ul>
                                            <li className="container">
                                                <img src={rawRecipe.recipe.image}/>
                                            </li>
                                                </ul>
                                        </Link>
                                    </div>
                                )
                            }
                        )

                    }

                    </div>
                    <div className="col-6">

                        <SearchRecipe props={this.props}
                            match={this.props.match}
                            history={this.props.history}/>
                    </div>

                    </div>
                </div>



                    <div className="container-fluid d-block d-md-none">
                    <div className="row">
                    <div className="col-12">
                    <h1>Recent Orders:</h1>


                    {/*diplay most recent order for the user*/}
                    {this.props.orders.map((order =>
                        <li>{order.items}</li>))}
                        <SearchRecipe props={this.props}
                                      match={this.props.match}
                                      history={this.props.history}/>


                    <h1>Today's pick</h1>

                    {
                        this.state.randomRecipes.map(
                            (rawRecipe, index) => {
                                // extract uri from data and use it as the unique identifier of recipe
                                const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)

                                return (
                                    <div key={index}>
                                        <Link to={`/search/q=${this.state.selectedIngredient}/${recipeUri}`}>

                                            <h3>{rawRecipe.recipe.label}</h3>
                                                <ul>
                                            <li className="container">
                                                <img src={rawRecipe.recipe.image}/>
                                            </li>
                                                </ul>
                                        </Link>
                                    </div>
                                )
                            }
                        )

                    }



                    </div>

                    </div>
                    </div>
                    </div>
                }








                {this.props.currentUser &&
                this.props.currentUser.type === "DELIVERER" &&
                <div>
                    <div className="container-fluid d-none d-md-block">
                <div className="row">
                    <div className="col-6">
                        <h1>Recent Orders For Delivery:</h1>
                        <div className="container-fluid">
                            {this.props.allOrders.map((ord)=>
                                <div className="container-fluid">
                                    {this.props.currentUser.userId === ord.delivererId &&
                                    <li>
                                        {ord.name}: {ord.items}
                                    </li>
                                    }
                                 </div>
                            )}
                        </div>
                        <h1>Today's pick</h1>

                        {
                            this.state.randomRecipes.map(
                                (rawRecipe, index) => {
                                    // extract uri from data and use it as the unique identifier of recipe
                                    const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)

                                    return (
                                        <div key={index}>
                                            <Link to={`/search/q=${this.state.selectedIngredient}/${recipeUri}`}>

                                                <h3>{rawRecipe.recipe.label}</h3>
                                                <ul>
                                                    <li className="container">
                                                        <img src={rawRecipe.recipe.image}/>
                                                    </li>
                                                </ul>
                                            </Link>
                                        </div>
                                    )
                                }
                            )

                        }

                    </div>
                    <div className="col-6">
                        <SearchRecipe props={this.props}
                                      match={this.props.match}
                                      history={this.props.history}/>

                    </div>

                </div>
                    </div>


                    <div className="container-fluid d-block d-md-none">
                    <div className="row">
                    <div className="col-12">
                    <h1>Recent Orders For Delivery:</h1>
                    <div className="container-fluid">
                    {this.props.allOrders.map((ord)=>
                        <div className="container-fluid">
                            {this.props.currentUser.userId === ord.delivererId &&
                            <li>
                                {ord.name}: {ord.items}
                            </li>
                            }
                        </div>
                    )}
                    </div>


                    <SearchRecipe props={this.props}
                    match={this.props.match}
                    history={this.props.history}/>
                        <h1>Today's pick</h1>

                        {
                            this.state.randomRecipes.map(
                                (rawRecipe, index) => {
                                    // extract uri from data and use it as the unique identifier of recipe
                                    const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)

                                    return (
                                        <div key={index}>
                                            <Link to={`/search/q=${this.state.selectedIngredient}/${recipeUri}`}>

                                                <h3>{rawRecipe.recipe.label}</h3>
                                                <ul>
                                                    <li className="container">
                                                        <img src={rawRecipe.recipe.image}/>
                                                    </li>
                                                </ul>
                                            </Link>
                                        </div>
                                    )
                                }
                            )

                        }
                    </div>

                    </div>
                    </div>
                </div>

                }


                {!this.props.currentUser &&
                <div>
                    <div className="container-fluid d-none d-md-block">
                <div className="row">
                    <div className="col-6">

                        <h1>Today's pick</h1>


                        {
                            this.state.randomRecipes.map(
                                (rawRecipe, index) => {
                                    // extract uri from data and use it as the unique identifier of recipe
                                    const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)

                                    return (
                                        <div key={index}>

                                            <Link to={`/search/q=${this.state.selectedIngredient}/${recipeUri}`}>


                                                <h3>{rawRecipe.recipe.label}</h3>

                                                <div className="container">
                                                    <img
                                                        className="img-thumbnail"
                                                        height="400px"
                                                        width="auto"
                                                        src={rawRecipe.recipe.image}/>
                                                </div>

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
                       <div hidden>{this.state.latestOrd = ord.name}</div>
                        )}
                        <p>{this.state.latestOrd}</p>


                        <SearchRecipe props={this.props}
                                      match={this.props.match}
                                      history={this.props.history}/>

                    </div>

                </div>

                    </div>


                    <div className="container-fluid d-block d-md-none">
                        <div className="row">
                            <div className="col-12">




                                <h1>Latest Recipe purchased:</h1>
                                {/*<ul>*/}
                                {this.props.allOrders.map((ord) =>
                                    <div hidden>{this.state.latestOrd = ord.name}</div>
                                )}

                                <p>{this.state.latestOrd}</p>


                                <SearchRecipe props={this.props}
                                              match={this.props.match}
                                              history={this.props.history}/>

                                <h1>Today's pick</h1>


                                {
                                    this.state.randomRecipes.map(
                                        (rawRecipe, index) => {
                                            // extract uri from data and use it as the unique identifier of recipe
                                            const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)

                                            return (
                                                <div key={index}>


                                                    <Link to={`/search/q=${this.state.selectedIngredient}/${recipeUri}`}>


                                                        <h3>{rawRecipe.recipe.label}</h3>

                                                        <div className="container">
                                                            <img
                                                                className="img-thumbnail"
                                                                height="400px"
                                                                width="auto"
                                                                src={rawRecipe.recipe.image}/>
                                                        </div>

                                                    </Link>
                                                </div>
                                            )
                                        }
                                    )

                                }


                            </div>

                        </div>

                    </div>


                </div>
                }


                {this.props.currentUser &&
                this.props.currentUser.type === "ADMIN" &&
                <div>
                    <div className="container-fluid d-none d-md-block">
                <div className="row">
                    <div className="col-6">
                        <h1>Most Recent User:</h1>
                        {this.props.users != null &&

                            <Link to={`/profile/${this.props.users[this.props.users.length-1].userId}`}>
                            <p>{this.props.users[this.props.users.length-1].username}</p>
                                </Link>
                        }


                        <h1>Today's pick</h1>

                        {
                            this.state.randomRecipes.map(
                                (rawRecipe, index) => {
                                    // extract uri from data and use it as the unique identifier of recipe
                                    const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)

                                    return (
                                        <div key={index}>
                                            <Link to={`/search/q=${this.state.selectedIngredient}/${recipeUri}`}>

                                                <h3>{rawRecipe.recipe.label}</h3>
                                                <ul>
                                                <li className="container">
                                                    <img src={rawRecipe.recipe.image}/>
                                                </li>
                                                </ul>
                                            </Link>
                                        </div>
                                    )
                                }
                            )

                        }

                    </div>
                    <div className="col-6">

                        <SearchRecipe props={this.props}
                                      match={this.props.match}
                                      history={this.props.history}/>
                    </div>

                </div>
                    </div>



                    <div className="container-fluid d-block d-md-none">
                        <div className="row">
                            <div className="col-12">
                                <h1>Most Recent User:</h1>
                                {this.props.users != null &&
                                // this.props.users.map(use =>
                                // <li>{use.username}</li>)
                                <Link to={`/profile/${this.props.users[this.props.users.length-1].userId}`}>
                                    <p>{this.props.users[this.props.users.length-1].username}</p>
                                </Link>
                                }
                                <SearchRecipe props={this.props}
                                              match={this.props.match}
                                              history={this.props.history}/>


                                <h1>Today's pick</h1>

                                {
                                    this.state.randomRecipes.map(
                                        (rawRecipe, index) => {
                                            // extract uri from data and use it as the unique identifier of recipe
                                            const recipeUri = encodeURIComponent(rawRecipe.recipe.uri)

                                            return (
                                                <div key={index}>
                                                    <Link to={`/search/q=${this.state.selectedIngredient}/${recipeUri}`}>

                                                        <h3>{rawRecipe.recipe.label}</h3>
                                                        <ul>
                                                            <li className="container">
                                                                <img src={rawRecipe.recipe.image}/>
                                                            </li>
                                                        </ul>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    )

                                }



                            </div>

                        </div>
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
