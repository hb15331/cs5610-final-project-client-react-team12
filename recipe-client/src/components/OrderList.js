import React from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import orderService from "../services/OrderService";

const OrderList = (
    {orders = []}) =>
    <div>

        {/*<h1>OrderList</h1>*/}
        <h1>ORDER LIST </h1>

        <ul>
            {
                orders.map(order =>

                    <div className="card" styles={{width: '18rem'}}>
                        {/*<div className="col-md-4">*/}
                        <img className="card-img-top"
                             src="https://picsum.photos/300/200"/>
                        <div className="card-body">


                    <span>
                        <li>

                            {order.items}

                        </li>

                        </span>
                         </div>
                     </div>
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
