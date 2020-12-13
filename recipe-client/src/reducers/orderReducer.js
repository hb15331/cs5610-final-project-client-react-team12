const initialState = {
    orders: [],
    users: [],
    allOrders: [],
    deliverers: [],
    order: {}
}

const orderReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FIND_ALL_ORDERS":
            return {
                ...state,
                allOrders: action.allOrders
            }
        case "FIND_ORDERS_FOR_USER":
            return {
                ...state,
                orders: action.orders,
                customerId: action.customerId
            }

        case "FIND_ORDER_BY_ID":
            return {
                ...state,
                order: action.order,
                orderID: action.orderId

            }


        case "FIND_DELIVERERS_FOR_ORDER":
            return {
                ...state,
                customerId: action.customerId,
                deliverers: action.deliverers
            }
        case "CREATE_ORDER":
            return {
                ...state,
                orders: [
                    ...state.orders,
                    action.order
                ]
            }
        case "DELETE_ORDER":
            return {
                ...state,
                orders: state.orders.filter(order => order.orderId !== action.orderId)
            }

        case "UPDATE_ORDER":
            return {
                orders: state.orders.map(
                    order => order.orderId === action.order.orderId ?
                        action.order : order),
                orderId: action.orderId,
                customerId: action.order.customerId,
                delivererId: action.order.delivererId,
                //orderPlaced: action.order.orderPlaced
            }

        case "UPDATE_ORDER_AS_COMPLETE":
            return {
                allOrders: state.allOrders.map(
                    order => order.orderId === action.order.orderId ?
                        action.order : order),
                orderId: action.orderId,
                customerId: action.order.customerId,
                delivererId: action.order.delivererId,
                delivered: true
            }


        default:
            return state
    }
}

export default orderReducer
