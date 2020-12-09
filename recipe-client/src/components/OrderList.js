import React from 'react'
import {connect} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"
import orderService from "../services/OrderService";
import UserActions from "../actions/UserActions";
import {Link} from "react-router-dom";
import OrderDetails from "./OrderDetails";

const OrderList = (
    {orders = [],
        currentUser, customerId, delivererId, deliverers = [],
        deleteOrder,
        findDeliverersForOrder, assignDelivererToOrder
    }) =>
    <div>

        {/*<h5>Current user:*/}
        {/*    {currentUser.userId ? currentUser.username : "anonymous"}*/}
        {/*</h5>*/}
        {/*<h1>OrderList</h1>*/}
        <Link to={"/home"}>
            <i className="fa fa-home fa-2x btn pull-right btn-sm"></i>

        </Link>
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
                                {/*{order.customerId}*/}
                                <div className="card-body">

                    <span>
                        <li>

                            {order.items}

                        </li>


                        </span>

                                </div>
                                {order.delivererId &&
                                <span>
                                        <h3>Your assigned deliverer for this order: Deliverer Id {order.delivererId}</h3>
                                    </span>
                                }

                            </div>
                        </div>


                        <div className="col-4">
                            <Link to={{pathname:"/cart"}}>
                                {console.log(customerId)}
                                <button className="btn btn-block btn-outline-info"
                                        onClick={() => findDeliverersForOrder(customerId)}>
                                    Find a deliverer
                                </button>
                                {console.log(deliverers)}
                            </Link>

                            <ol>

                                {/*<h5>Please select a deliverer for your order</h5>*/}
                                {deliverers.map(deliverer =>
                                    <li>
                                        <ul className="list-group">
                                            {console.log("Deliverer: ",deliverer)}
                                            {console.log("Order before assignment: ", order)}

                                            <li onClick={() => assignDelivererToOrder(order.orderId, deliverer.userId, {
                                                ...order,
                                                delivererId: deliverer.userId,
                                                orderId: order.orderId,
                                                customerId: order.customerId
                                            })}
                                                className="list-group-item btn">
                                                <h4>Deliverer ID: {deliverer.username}</h4>
                                                Name: {deliverer.firstname} <br/>
                                                Location: {deliverer.location} <br/>
                                                {console.log("new order", order)}
                                            </li>

                                        </ul>


                                    </li>
                                )}
                            </ol>

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
    deliverers: state.orderReducer.deliverers,
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

    findDeliverersForOrder: (customerId) =>
        orderService.findDeliverersForOrder(customerId)
            .then(drivers => dispatch({
                type: "FIND_DELIVERERS_FOR_ORDER",
                customerId: customerId,
                deliverers: drivers
            })),

    assignDelivererToOrder: (orderId, delivererId, newOrder) =>
        orderService.updateOrder(orderId, delivererId, {
            ...newOrder, orderPlaced: true
        })
            .then(status => dispatch({
                type: "UPDATE_ORDER",
                orderId: orderId,
                delivererId: delivererId,
                order: newOrder
            }))


    // assignDelivererToOrder: (orderId, newOrder) =>
    //     orderService.updateOrder(orderId, newOrder)
    //         .then(status => dispatch({
    //             type: "UPDATE_ORDER",
    //             orderId: orderId,
    //             order: newOrder
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
