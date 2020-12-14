import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.css"
import '../styling/RecipeDetails-style.css'

import OrderList from "./OrderList";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import orderService from "../services/OrderService"
import UserActions from "../actions/UserActions";
import OrderActions from "../actions/OrderActions";
import edmamApiService from "../services/edmamApiService";


// const APP_ID = "e488ff8f"
// const APP_KEY = "922801bd953e0343123e19348ba693fe"
// const RECIPE_URL = "https://api.edamam.com/search"

const APP_ID = "040971eb"
const APP_KEY = "aa00af86118008cae75d54f7cdded366"
const RECIPE_URL = "https://api.edamam.com/search"


// let itemOrd= [];
export class RecipeDetails extends React.Component {

    state = {
        recipe: {
            ingredients: []
        },
        orders: [],
        usersList: [],
        customIdList: [],
        purchaseBy : false,

        // new addition
        recipeUri: '',
        userId: '',
        keyword: ''
    }

    componentDidMount() {
        // retrieve the uri from url
        console.log(this.props)
        const recipeUri = this.props.match.params.recipeUri

        if(this.props.currentUser != null) {
            const userId = this.props.currentUser.userId
            const keyword = this.props.match.params.keyword

            this.setState({
                recipeUri: recipeUri,
                userId: userId,
                keyword: keyword
            })
        }


        const queryUrl = `${RECIPE_URL}?r=${recipeUri}&app_id=${APP_ID}&app_key=${APP_KEY}`

        if(this.props.currentUser != null){
            {this.props.findAllOrders()}
        }

        edmamApiService.findRecipesBySearchKeyword(queryUrl)
            .then(recipe => this.setState(preState => ({
                ...preState, recipe: recipe[0]
            })))
    }

     componentDidUpdate(prevProps, prevState, snapshot) {

        console.log("Props in update:", this.props)
         if(prevProps.match.params.recipeUri !== this.props.match.params.recipeUri){
             this.setState({
                 recipeUri: this.props.match.params.recipeUri
             })
             if(this.props.match.params.recipeUri) {
                 const queryUrl = `${RECIPE_URL}?r=${this.props.match.params.recipeUri}&app_id=${APP_ID}&app_key=${APP_KEY}`
                 console.log("QueryURL:" , queryUrl)
                 edmamApiService.findRecipesBySearchKeyword(queryUrl)
                     .then(recipe => this.setState(preState => ({
                         ...preState, recipe: recipe[0]
                     })))
             }
         }

     }

    addItems = (item) => {

        let itemOrd = [];
        itemOrd = this.state.orders.concat(item);
        this.setState({orders: itemOrd})

    }

    showCustomers = () => {
        this.setState({purchaseBy:true})
    }
    render() {
        return (

            <div className="container">
                <div>
                <div>

                    <Link to={{pathname:"/cart",}}>
                        <i className="fa fa-shopping-basket fa-2x btn pull-right btn-sm"></i>
                    </Link>
                    <Link to={"/home"}>
                        <i className="fa fa-home fa-2x btn pull-right btn-sm"></i>

                    </Link>
                </div>


                    <div className="container-fluid d-none d-md-block">
                         <p className="centerImg">
                    <h1 className="title">{this.state.recipe.label}</h1>

                    <img src={this.state.recipe.image}/>
                    </p>
                        </div>
                    <div className="container-fluid d-block d-md-none">
                        <p className="centerImg">
                            <h1 >{this.state.recipe.label}</h1>

                            <img src={this.state.recipe.image}/>
                        </p>
                    </div>
                </div>

                    <div>
                        <div className="container-fluid d-none d-md-block">
                            <div className="row">
                                <div className="col-6">
                    <h3>Number of Servings:</h3>
                    <p>{this.state.recipe.yield}</p>
                    <h3>Total Calories(kcal):</h3>
                    <p>{this.state.recipe.calories}</p>
                    <h3>Total Weight(g):</h3>
                    <p>{this.state.recipe.totalWeight}</p>

                    <h3>Ingredients:</h3>
                    <ul>
                        {
                            this.state.recipe.ingredients.map((ingredient) =>
                                    <span>
                        <li>
                            <i className="fa fa-plus-square fa-plus-square fa-lg"
                               onClick={()=>this.addItems(ingredient.text)}></i>
                            {ingredient.text}
                        </li>

                        </span>
                            )}
                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul>

                        <h2>Wish List</h2>
                        {
                            this.state.orders.map((ingredient) =>
                                    <span>
                        <li>

                            {ingredient}
                        </li>

                        </span>
                            )}
                    </ul>
                    <ul>
                        <Link to={`/details/purchases`}
                              onClick={this.showCustomers}>
                            <h5>Also purchased by:</h5>
                        </Link>

                        {
                            this.state.purchaseBy === true &&
                            this.props.allOrders.map((user) =>

                                <li>
                                    {(this.state.recipe.label === user.name) && (this.state.usersList.includes(user.username) === false) &&
                                    <div>

                                        {this.state.usersList.push(user.username)}
                                        {this.state.customIdList.push(user.customerId)}

                                    </div>
                                    }
                                </li>

                            )

                        }

                        {this.state.usersList.map((userL,index) =>
                            <Link to={`/profile/${this.state.customIdList[index]}`}>
                                <li>{userL}</li>
                            </Link>

                        )}

                    </ul>
                                    {this.props.currentUser && this.props.currentUser.type === "CUSTOMER" &&
                                    <Link to="/cart">
                                        <button className="fa fa-cart-plus fa-2x btn-success" aria-hidden="true"
                                                onClick={() => this.props.createOrder(this.props.currentUser.username,
                                                    this.state.recipe.label, this.state.orders.toString(), this.props.currentUser.userId,
                                                    this.state.recipe.image, this.props.match.params.recipeUri)}>
                                            Add to cart
                                        </button>
                                    </Link>

                                    }
                                    {this.props.currentUser && this.props.currentUser.type === "DELIVERER" &&
                                    <Link to="/login">
                                        <button className="fa fa-cart-plus fa-2x btn-success" aria-hidden="true"
                                                onClick={() => alert("Please sign in as a Customer. Thank you!")}>
                                            Add to cart
                                        </button>
                                    </Link>
                                    }
                                    {!this.props.currentUser &&
                                    <Link to="/login">
                                        <button className="fa fa-cart-plus fa-2x btn-success" aria-hidden="true"
                                                onClick={() => alert("Please register/log in to place an order!")}>
                                            Add to cart
                                        </button>
                                    </Link>
                                    }
                                </div>

                    <div className="col-12">



                    </div>
                            </div>
                        </div>



                        <div className="container-fluid d-block d-md-none">
                            <div className="row">
                                <div className="col-12">
                                    <h3>Number of Servings:</h3>
                                    <p>{this.state.recipe.yield}</p>
                                    <h3>Total Calories(kcal):</h3>
                                    <p>{this.state.recipe.calories}</p>
                                    <h3>Total Weight(g):</h3>
                                    <p>{this.state.recipe.totalWeight}</p>

                                    <h3>Ingredients:</h3>
                                    <ul>
                                        {
                                            this.state.recipe.ingredients.map((ingredient) =>
                                                    <span>
                        <li>
                            <i className="fa fa-plus-square fa-plus-square fa-lg"
                               onClick={()=>this.addItems(ingredient.text)}></i>
                            {ingredient.text}
                        </li>

                        </span>
                                            )}
                                    </ul>

                                    <ul>

                                        <h2>Wish List</h2>
                                        {
                                            this.state.orders.map((ingredient) =>
                                                    <span>
                        <li>

                            {ingredient}
                        </li>

                        </span>
                                            )}
                                    </ul>
                                    <ul>
                                        <Link to={`/details/purchases`}
                                              onClick={this.showCustomers}>
                                            <h5>Also purchased by:</h5>
                                        </Link>

                                        {
                                            this.state.purchaseBy === true &&
                                            this.props.allOrders.map((user) =>

                                                <li>
                                                    {(this.state.recipe.label === user.name) && (this.state.usersList.includes(user.username) === false) &&
                                                    <div>

                                                        {this.state.usersList.push(user.username)}
                                                        {this.state.customIdList.push(user.customerId)}

                                                    </div>
                                                    }
                                                </li>

                                            )

                                        }

                                        {this.state.usersList.map((userL,index) =>
                                            <Link to={`/profile/${this.state.customIdList[index]}`}>
                                                <li>{userL}</li>
                                            </Link>

                                        )}

                                    </ul>
                                    {this.props.currentUser && this.props.currentUser.type === "CUSTOMER" &&
                                    <Link to="/cart">
                                        <button className="fa fa-cart-plus fa-2x btn-success" aria-hidden="true"
                                                onClick={() => this.props.createOrder(this.props.currentUser.username,
                                                    this.state.recipe.label, this.state.orders.toString(), this.props.currentUser.userId,
                                                    this.state.recipe.image, this.props.match.params.recipeUri)}>
                                            Add to cart
                                        </button>
                                    </Link>

                                    }
                                </div>

                                <div className="col-12">
                                    {this.props.currentUser && this.props.currentUser.type === "DELIVERER" &&
                                    <Link to="/login">
                                        <button className="fa fa-cart-plus fa-2x btn-success" aria-hidden="true"
                                                onClick={() => alert("Please sign in as a Customer. Thank you!")}>
                                            Add to cart
                                        </button>
                                    </Link>
                                    }

                                    {!this.props.currentUser &&
                                    <Link to="/login">
                                        <button className="fa fa-cart-plus fa-2x btn-success" aria-hidden="true"
                                                onClick={() => alert("Please register/log in to place an order!")}>
                                            Add to cart
                                        </button>
                                    </Link>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                {/*</div>*/}


            </div>


        )
    }
}

const stateToPropertyMapper = (state) => ({
    order: state.orderReducer.order,
    currentUser: state.UserReducer.currentUser,
    orders: state.orderReducer.orders,
    allOrders: state.orderReducer.allOrders
})

const propertyToDispatchMapper = (dispatch) => ({
    profile: () => UserActions.profile(dispatch),
    createOrder: (username, name,items,userId,image,recipeUri)=>
        orderService.createOrder({username:username,name:name,items:items,customerId:userId, image:image, recipeUri: recipeUri})
            .then(actualOrder => dispatch({
                type: "CREATE_ORDER",
                order: actualOrder
            })),
    findAllOrders: () => OrderActions.findAllOrders(dispatch)
})




export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(RecipeDetails)
