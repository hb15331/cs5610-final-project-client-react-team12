import React from 'react'
import {connect} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"
import orderService from "../services/OrderService";
import UserActions from "../actions/UserActions";

const OrderList = (
    {orders = [],
        currentUser, customerId, delivererId,
        deleteOrder,
        findDelivererForOrder
    }) =>
    <div>

        {/*<h5>Current user:*/}
        {/*    {currentUser.userId ? currentUser.username : "anonymous"}*/}
        {/*</h5>*/}
        {/*<h1>OrderList</h1>*/}
        <h1>ORDER LIST </h1>

        <ul>
            {
                orders.map(order =>

                    <div className="row">
                    <div className="col-8">
                        <div className="card order-card-style">
                            {/*<div className="col-md-4">*/}
                            <i className="fa fa-times fa-2x btn float-right"
                               onClick={()=>deleteOrder(order.orderId)}></i>
                            <img className="card-img-top"
                                // src="https://picsum.photos/300/200"/>
                                 src={order.image}/>
                            {order.customerId}
                            <div className="card-body">


                    <span>
                        <li>

                            {order.items}

                        </li>

                        </span>
                            </div>
                        </div>
                    </div>

                <div className="col-4">
                <h3>Your assigned deliverer:</h3>

                </div>
                    </div>


                )
            }

        </ul>



    </div>

//
const stateToPropertyMapper = (state) => ({
    orders: state.orderReducer.orders,
    customerId: state.orderReducer.customerId,
    delivererId: state.orderReducer.delivererId,
    currentUser: state.UserReducer.currentUser
})
const dispatchToPropertyMapper = (dispatch) => ({
    profile: () => UserActions.profile(dispatch),

    deleteOrder: (orderId) =>
        orderService.deleteOrder(orderId)
            .then(status => dispatch({
                type: "DELETE_ORDER",
                orderId
            })),

    // findDelivererForOrder: (orderId) =>
    //     orderService.findDelivererForOrder(orderId)
    //         .then(status => dispatch({
    //             type: "FIND_DELIVERER_FOR_ORDER",
    //             orderId
    //         }))



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
