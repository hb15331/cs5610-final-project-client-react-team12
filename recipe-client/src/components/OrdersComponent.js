import {connect} from "react-redux";
import {RecipeDetails} from "./RecipeDetails";
import UserActions from "../actions/UserActions";
import orderService from "../services/OrderService";

export class OrdersComponent extends React.Component {

    state = {
        orders: [],
        users: [],
        currentUser: {},
        deliverer: null
    }

    render() {

    }
}

const stateToPropertyMapper = (state) => ({
    orders: state.orderReducer.orders,
    users: state.UserReducer.users,
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

    findDelivererForOrder: (order) =>
        orderService.findDelivererForOrder(order, currentUser)
            .then(status => dispatch({
                type: "FIND_DELIVERER_FOR_ORDER",
                currentUser: currentUser,
                order
            }))
})


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(RecipeDetails)
