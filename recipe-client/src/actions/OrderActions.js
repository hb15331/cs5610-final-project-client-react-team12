import orderService from "../services/OrderService";

const findAllOrders = (dispatch) =>
    orderService.findAllOrders()
        .then(allOrders => dispatch({
            // type: "FIND_ALL_WIDGETS",
            type: "FIND_ALL_ORDERS",
            allOrders
        }))

const findOrderForUser = (dispatch,customerId) =>
    orderService.findOrderForUser(customerId)
    .then(orders => dispatch({
        type: "FIND_ORDERS_FOR_USER",
        orders,
        customerId
    }))
export default {findOrderForUser, findAllOrders}
