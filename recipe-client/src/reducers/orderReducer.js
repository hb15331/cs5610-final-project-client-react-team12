const initialState = {
    orders: []
}

const orderReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FIND_ALL_ORDERS":
            return {
                ...state,
                orders: action.orders
            }
        case "CREATE_ORDER":
            return {
                ...state,
                orders: [
                    ...state.orders,
                    action.order
                ]
            }
        default:
            return state
    }
}

export default orderReducer
