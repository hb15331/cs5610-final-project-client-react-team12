import React from 'react'
import {connect} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"
import orderService from "../services/OrderService";
import UserActions from "../actions/UserActions";

const OrderList = (
    {orders = [],
        currentUser,
        deleteOrder
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

                    <div className="card" styles={{width: '18rem'}}>
                        {/*<div className="col-md-4">*/}
                        <i className="fa fa-times fa-2x"
                        onClick={()=>deleteOrder(order.orderId)}></i>
                        <img className="card-img-top"
                             // src="https://picsum.photos/300/200"/>
                        src={order.image}/>
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
    orders: state.orderReducer.orders,
    customerId: state.orderReducer.customerId,
    currentUser: state.UserReducer.currentUser
})
const dispatchToPropertyMapper = (dispatch) => ({
    profile: () => UserActions.profile(dispatch),
    deleteOrder: (orderId) =>
        orderService.deleteOrder(orderId)
            .then(status => dispatch({
                type: "DELETE_ORDER",
                orderId
            }))
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
