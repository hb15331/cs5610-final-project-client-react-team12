import React from "react";
import {connect} from "react-redux";
import orderService from "../services/OrderService"
import OrderList from "../components/OrderList";


class orderListContainer extends React.Component {


    componentDidMount() {
        const orderId = this.props.match.params.orderId

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const orderId = this.props.match.params.orderId
    }
    render() {
        return(
            <div class="container-fluid">
                <OrderList/>
            </div>

        )

    }

}

const stateToPropertyMapper = (state) => ({
    // course: state.courseReducer.course
    item: state.orderReducer.item
})

const propertyToDispatchMapper = (dispatch) => ({

    findAllOrder: () =>
        orderService.findAllOrder()
            .then(items => dispatch({
                // type: "FIND_ALL_WIDGETS",
                type: "FIND_ALL_ORDERS",
                items
            }))
})

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(orderListContainer)
