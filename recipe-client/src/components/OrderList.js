import React from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import orderService from "../services/OrderService";

const OrderList = (props) =>
    <div>
        <h1>ORDER LIST for {props.location.label.label} </h1>
        {
            props.location.state.items.map((item) =>
                // orders.push(item)

                <li>
                    {item}
                </li>
            )}

    </div>
//
const dispatchToPropertyMapper = (dispatch) => ({

    // createOrder: (userName, password, type) =>
    //     orderService.createOrder()
    //         .then(actualOrder => dispatch({
    //             type: "CREATE_ORDER",
    //             order: actualOrder
    //         }))
})

export default connect
(dispatchToPropertyMapper())
(OrderList)
