const initialState = {
    users: [],
    currentUser: null

}


const UserReducer = (state=initialState, action) => {
    switch (action.type) {
        case "PROFILE":
            return {
                currentUser: action.currentUser
            }
        case "UPDATE_PROFILE":
            return {
                currentUser: action.newProfile
            }
        case "FIND_ALL_USERS":
            return {
                ...state,
                users: action.users
            }
        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter(user => user.userId !== action.userId)
            }

        default:
            return state
    }
}


export default UserReducer
