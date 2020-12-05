const initialState = {
    orders: [],
    users: [],
    deliverers: []
}

const orderReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FIND_ALL_ORDERS":
            return {
                ...state,
                orders: action.orders
            }
        case "FIND_ORDERS_FOR_USER":
            return {
                ...state,
                orders: action.orders,
                customerId: action.customerId
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
                orders: state.orders.filter(order => order.id !== action.orderId)
            }

        // case "UPDATE_ORDER":
        //     return {
        //         ...state,
        //     }
        default:
            return state
    }
}

export default orderReducer
