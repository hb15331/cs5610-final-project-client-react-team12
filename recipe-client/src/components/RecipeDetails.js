import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.css"
import '../styling/RecipeDetails-style.css'
import OrderList from "./OrderList";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import orderService from "../services/OrderService"
import UserActions from "../actions/UserActions";


const APP_ID = "e488ff8f"
const APP_KEY = "922801bd953e0343123e19348ba693fe"
const RECIPE_URL = "https://api.edamam.com/search"

// https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_b79327d05b8e5b838ad6cfd9576b30b6&app_id=e488ff8f&app_key=922801bd953e0343123e19348ba693fe

let itemOrd= [];
export class RecipeDetails extends React.Component {

    state = {
        recipe: {
            ingredients: []
        },
        orders: [],

    }

    componentDidMount() {
        // retrieve the uri from url
        const recipeUri = this.props.match.params.recipeUri
        const queryUrl = `${RECIPE_URL}?r=${recipeUri}&app_id=${APP_ID}&app_key=${APP_KEY}`

        // findRecipeById
        fetch(queryUrl)
            .then(response => response.json())
            .then(recipe => this.setState(preState => ({
                ...preState, recipe: recipe[0]
            })))
    }


    addItems = (item) => {

        itemOrd.push(item)
        this.setState({orders: itemOrd})
    }

    render() {
        return (
            <div className="container">
                <div>
                    <Link to={{pathname:"/cart",
                        // state:{orders:this.state.orders},
                        // label: {label:this.state.recipe.label}
                        // state:{label: this.state.recipe.label,
                        //         orders:this.state.recipe.ingredients
                        // }
                    }}>
                    <i className="fa fa-shopping-basket fa-2x btn btn-success pull-right"></i>
                    </Link>
                </div>
                <h5>Current user:
                    {this.props.currentUser.userId ? this.props.currentUser.username : "anonymous"}
                </h5>
                <div>
                    <h1>{this.state.recipe.label}</h1>
                    <img src={this.state.recipe.image}/>
                    {/*{JSON.stringify(this.state.recipe)}*/}

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
                        <h2>Order's List</h2>
                        {
                            this.state.orders.map((ingredient) =>
                                    <span>
                        <li>

                            {ingredient}
                        </li>

                        </span>
                            )}
                    </ul>

                    <i className="fa fa-cart-plus fa-2x btn" aria-hidden="true"
                       onClick={()=>this.props.createOrder(itemOrd.toString(),this.props.currentUser.userId)}
                    >Add to cart</i>
                </div>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    order: state.orderReducer.order,
    currentUser: state.UserReducer.currentUser
})

const propertyToDispatchMapper = (dispatch) => ({
    profile: () => UserActions.profile(dispatch),
    createOrder: (items,userId)=>
        orderService.createOrder({items:items,customerId:userId})
            .then(actualOrder => dispatch({
                type: "CREATE_ORDER",
                order: actualOrder
            }))
})



export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(RecipeDetails)
