const initialState = {
    items: [],
}

const orderReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FIND_ALL_ORDERS":
            return {
                ...state,
                items: action.items
            }
        case "CREATE_ORDER":
            return {
                ...state,
                items: [
                    ...state.items,
                    action.item
                ]
            }
        default:
            return state
    }
}

export default orderReducer()
