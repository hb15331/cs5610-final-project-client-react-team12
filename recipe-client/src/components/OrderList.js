import React from 'react'
import {connect} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"
import orderService from "../services/OrderService";
import UserActions from "../actions/UserActions";
import {Link} from "react-router-dom";
import '../styling/OrderListStyle.css'

import OrderActions from "../actions/OrderActions";

const OrderList = (
    {orders = [],
        currentUser, customerId, delivererId, deliverers = [], userId, orderStatus,
        deleteOrder,
        findDeliverersForOrder, assignDelivererToOrder, markOrderCompleted,
        allOrders = [], updateOrder, delivered
    }) =>
    <div>


        <Link to={"/home"}>
            <i className="fa fa-home fa-2x btn pull-right btn-sm"></i>
        </Link>
        {currentUser &&
        currentUser.type === "CUSTOMER" &&
        <h1>Order History</h1>}
        {currentUser &&
        currentUser.type === "DELIVERER" &&
        <h1>Order to Deliver</h1>}

        <h6>Scroll down to see your latest order</h6>

        <div className="container-fluid d-none d-lg-block">
        {currentUser &&
        currentUser.type === "CUSTOMER" &&

        <ol>
            {
                orders.map(order =>

                    <div className="row">
                        <div className="col-8">

                            <div className="card card-img-top">
                                <li>
                                    <i className="fa fa-times fa-2x btn float-right"
                                       onClick={() => deleteOrder(order.orderId)}></i>
                                    <img className="img-thumbnail"
                                         height="400px"
                                         width="auto"
                                         src={order.image}/>
                                    {/*{order.customerId}*/}

                                    <div className="card-body">

                                        <h6>{order.items}</h6><br/>
                                        {!order.delivered &&
                                        <p>Order status: Pending</p>
                                        }
                                        {order.delivered &&
                                        <p>Order status: Delivered</p>
                                        }

                                    </div>
                                    {order.delivererId &&
                                    <span>
                                    <h5>Your assigned deliverer for this order: DelivererId {order.delivererId}</h5>
                                </span>
                                    }
                                </li>

                            </div>

                        </div>


                        <div className="col-4">
                            <Link to={{pathname: "/cart"}}>
                                {console.log(customerId)}
                                <button className="btn btn-block btn-outline-info"
                                        onClick={() => findDeliverersForOrder(customerId)}>
                                    Find a deliverer
                                </button>
                                {console.log(deliverers)}
                            </Link>

                            <ol>


                                {deliverers.map(deliverer =>
                                    <li>
                                        <ul className="list-group">
                                            {console.log("Deliverer: ", deliverer)}
                                            {console.log("Order before assignment: ", order)}


                                            <li onClick={() => assignDelivererToOrder(order.orderId, deliverer.userId, {
                                                ...order,
                                                delivererId: deliverer.userId,
                                                orderId: order.orderId,
                                                customerId: order.customerId,
                                                delivered: false

                                            })}
                                                className="list-group-item btn">
                                                <h4>Deliverer: {deliverer.username}</h4>
                                                Name: {deliverer.firstName} <br/>
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

        </ol>

        }

        {console.log("I am there", allOrders)}


        {currentUser &&
        currentUser.type === "DELIVERER" &&
        <ul>
            { allOrders !== undefined &&
            allOrders.map(order =>

                <div className="row">
                    <div className="col-8">
                        {currentUser.userId === order.delivererId &&
                        <div className="card card-img-top">

                            <li>

                                <img className="img-thumbnail"
                                     height="400px"
                                     width="auto"
                                     src={order.image}/>

                                <div className="card-body">

                                    <h6>{order.items}</h6>
                                    <br/>
                                    <p>Order Id: {order.orderId}</p>
                                    <p>Deliverer Id: {order.delivererId}</p>

                                    <Link to="/cart">
                                        <i className="fa fa-truck btn btn-outline-success" aria-hidden="true"
                                           onClick={() => markOrderCompleted(order, order.delivererId)}>
                                            Mark as delivered
                                        </i>
                                    </Link>


                                </div>


                            </li>


                        </div>


                        }


                    </div>
                </div>
            )
            }

        </ul>
        }
        </div>




        <div className="container-fluid d-block d-lg-none">
            {currentUser &&
            currentUser.type === "CUSTOMER" &&

            <ol>
                {
                    orders.map(order =>

                        <div className="row">
                            {/*<div className="col-8">*/}
                                <div className="col-12">

                                <div className="card card-img-top">
                                    <li>
                                        <i className="fa fa-times fa-2x btn float-right"
                                           onClick={() => deleteOrder(order.orderId)}></i>
                                        <img className="img-thumbnail"
                                             height="400px"
                                             width="auto"
                                             src={order.image}/>
                                        {/*{order.customerId}*/}

                                        <div className="card-body">

                                            <h6>{order.items}</h6><br/>
                                            {!order.delivered &&
                                            <p>Order status: Pending</p>
                                            }
                                            {order.delivered &&
                                            <p>Order status: Delivered</p>
                                            }

                                        </div>
                                        {order.delivererId &&
                                        <span>
                                    <h5>Your assigned deliverer for this order: DelivererId {order.delivererId}</h5>
                                </span>
                                        }
                                    </li>

                                </div>

                            {/*</div>*/}


                            {/*<div className="col-4">*/}
                                <Link to={{pathname: "/cart"}}>
                                    {console.log(customerId)}
                                    <button className="btn btn-block btn-outline-info"
                                            onClick={() => findDeliverersForOrder(customerId)}>
                                        Find a deliverer
                                    </button>
                                    {console.log(deliverers)}
                                </Link>

                                <ol>


                                    {deliverers.map(deliverer =>
                                        <li>
                                            <ul className="list-group">
                                                {console.log("Deliverer: ", deliverer)}
                                                {console.log("Order before assignment: ", order)}


                                                <li onClick={() => assignDelivererToOrder(order.orderId, deliverer.userId, {
                                                    ...order,
                                                    delivererId: deliverer.userId,
                                                    orderId: order.orderId,
                                                    customerId: order.customerId,
                                                    delivered: false

                                                })}
                                                    className="list-group-item btn">
                                                    <h4>Deliverer: {deliverer.username}</h4>
                                                    Name: {deliverer.firstName} <br/>
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

            </ol>

            }

            {console.log("I am there", allOrders)}


            {currentUser &&
            currentUser.type === "DELIVERER" &&
            <ul>
                { allOrders !== undefined &&
                allOrders.map(order =>

                    <div className="row">
                        <div className="col-8">
                            {currentUser.userId === order.delivererId &&
                            <div className="card card-img-top">

                                <li>

                                    <img className="img-thumbnail"
                                         height="400px"
                                         width="auto"
                                         src={order.image}/>

                                    <div className="card-body">

                                        <h6>{order.items}</h6>
                                        <br/>
                                        <p>Order Id: {order.orderId}</p>
                                        <p>Deliverer Id: {order.delivererId}</p>


                                        <Link to="/cart">
                                            <i className="fa fa-truck btn btn-outline-success" aria-hidden="true"
                                               onClick={() => markOrderCompleted(order, order.delivererId)}>
                                                Mark as delivered
                                            </i>
                                        </Link>


                                    </div>


                                </li>


                            </div>


                            }


                        </div>
                    </div>
                )
                }

            </ul>
            }
        </div>




    </div>


//
const stateToPropertyMapper = (state) => ({
    orders: state.orderReducer.orders,
    customerId: state.orderReducer.customerId,
    deliverers: state.orderReducer.deliverers,
    currentUser: state.UserReducer.currentUser,
    //allOrders: state.orderReducer.allOrders
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
        orderService.updateOrder(orderId, delivererId, newOrder)
            .then(status => dispatch({
                type: "UPDATE_ORDER",
                orderId: orderId,
                delivererId: delivererId,
                order: newOrder,

            })),
    //.then(newOrder => console.log("New order", newOrder)),


    markOrderCompleted: (order,delivererId) =>
        orderService.updateOrderAsComplete(order.orderId, delivererId, {
            ...order, delivered: true
        })
            .then(status => dispatch({
                type: "UPDATE_ORDER_AS_COMPLETE",
                orderId: order.orderId,
                delivererId: delivererId,
                order: {...order, delivered: true}
            })).then(status => alert("Order delivered!"))



})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(OrderList)
