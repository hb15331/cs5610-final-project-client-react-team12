const API_BASE_URL = "http://localhost:8080"


const register = (newUser) =>
    fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json().catch(error => null))


// get the current user's profile from server
const profile = () =>
    fetch(`${API_BASE_URL}/profile`, {
        method: 'POST',
        credentials: "include"
    }).then(response => {
        console.log(response)
        return response.json().catch(error => null)})


const logout = () =>
    fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: "include"
    }).then(response => response.json())


const login = (user) =>
    fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json().catch(error => null))


const updateProfile = (newProfile) =>
    fetch(`${API_BASE_URL}/api/profiles/${newProfile.userId}`, {
        method: 'PUT',
        body: JSON.stringify(newProfile),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

const findAllUsers = () =>
    fetch(`${API_BASE_URL}/api/profiles`)
        .then(response => response.json())





const findPublicProfileById = (userId) =>
    fetch(`${API_BASE_URL}/api/profiles/${userId}`)
        .then(response => response.json())


export default {
    register, profile, logout, login, updateProfile, findAllUsers, findPublicProfileById
}
