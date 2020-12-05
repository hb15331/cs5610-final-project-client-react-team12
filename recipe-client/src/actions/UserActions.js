import UserService from "../services/UserService";

const profile = (dispatch) =>
    UserService.profile()
        .then(currentUser => dispatch({type: "PROFILE", currentUser: currentUser}))


const updateProfile = (newProfile, dispatch) =>
    dispatch({
        type: "UPDATE_PROFILE",
        newProfile: newProfile
    })


const saveProfile = (newProfile, dispatch) =>
    UserService.updateProfile(newProfile)
        .then(status => {
            console.log(status)
            if (status === 1) {
                alert("The update is saved in server")
                dispatch({type: "UPDATE_PROFILE", newProfile: newProfile})
            } else {
                alert("UPDATE FAILED: This username already exists in server!")
            }
        })

const findAllUsers = (dispatch) =>
    UserService.findAllUsers()
        .then(users => {console.log(users)
            dispatch({type: "FIND_ALL_USERS",
                users

        })})

export default {profile, saveProfile, updateProfile, findAllUsers}
