import React from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import orderService from "../services/OrderService";

const OrderList = (props,{orders = props.orders}) =>
    <div>

        {/*<h1>OrderList</h1>*/}
        <h1>ORDER LIST for {props.label} </h1>
        <ul>
            {
                orders.map((ingredient) =>
                    <span>
                        <li>

                            {ingredient.text}

                        </li>

                        </span>
                )}
        </ul>


    </div>
//
const stateToPropertyMapper = (state) => ({
    orders: state.orderReducer.orders
})
const dispatchToPropertyMapper = (dispatch) => ({

    // createOrder: (userName, password, type) =>
    //     orderService.createOrder()
    //         .then(actualOrder => dispatch({
    //             type: "CREATE_ORDER",
    //             order: actualOrder
    //         }))
})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(OrderList)
