import orderService from "../services/OrderService";

const findOrderForUser = (dispatch,customerId) =>
    orderService.findOrderForUser(customerId)
    .then(orders => dispatch({
        type: "FIND_ORDERS_FOR_USER",
        orders,
        customerId
    }))
export default {findOrderForUser}
