const initialState = {
    currentUser: null
    // currentUser: {userId: '', username: '', type: '', password: '', email: ''}
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
        default:
            return state
    }
}


export default UserReducer
