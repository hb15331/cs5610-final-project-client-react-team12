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
            dispatch({type: "UPDATE_PROFILE", newProfile: newProfile})
        })



export default {profile, saveProfile, updateProfile}
