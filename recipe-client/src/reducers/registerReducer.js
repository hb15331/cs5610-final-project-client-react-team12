const initialState = {
    users: [],
}

const registerReducer = (state=initialState, action) => {
    switch(action.type) {
        case "CREATE_USERS":
            return {
                ...state,
                users: [
                    ...state.users,
                    action.user
                ]
            }
        default:
            return state
    }
}

export default registerReducer()