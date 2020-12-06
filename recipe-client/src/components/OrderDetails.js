import React from "react"
import {connect} from "react-redux";
import orderService from "../services/OrderService"
import orderReducer from "../reducers/orderReducer";

export class OrderDetails extends React.Component {
    state = {
        orders: [],
        orderId: '',
        currentUser: '',
        order: {
            orderID: '',
            image: '',
            items: '',
            customerId: '',
            delivererId: ''
        }
    }

    componentDidMount() {

        // const orderId = this.props.match.params.orderId
        console.log(this.props.orderId)
        const orderId = this.props.orderId

        // hardcoding orderId for now as orderId is undefined
        this.props.findOrderById(orderId)
        //     .then(order => this.setState(prevState => ({
        //     ...prevState, order: order
        // })))

        const order = this.state.order

        console.log("Order in orderDetails:" , order)
    }

    render() {
        return (
            <div>


                <h4>Your order summary</h4>
                <h6>Order placed for recipe:</h6>
                {this.state.order.image}
                <h6>Order Id:</h6>
                {this.state.order.orderId}
                <h6>Order details:</h6>
                {this.state.order.items}
                <h6>Assigned deliverer:</h6>
                {this.state.order.delivererId}


            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    order: state.orderReducer.order,
    orderId: state.orderReducer.orderId,
    currentUser: state.UserReducer.currentUser
})

const dispatchToPropertyMapper = (dispatch) => ({

    findOrderById: (orderId) =>
        orderService.findOrderById(orderId)
            .then(order => dispatch({
                type: "FIND_ORDER_BY_ID",
                orderId: orderId,
                order: order
            })),

})


export default connect (stateToPropertyMapper, dispatchToPropertyMapper) (OrderDetails)
