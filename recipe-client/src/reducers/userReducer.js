const initialState = {
    users: []
}

const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FIND_ALL_USERS":
            return {
                ...state,
                users: action.users
            }
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

export default userReducer
