const USER_URL = "http://localhost:8080/api/users"

const findAllUsers = () =>
    fetch(USER_URL)
        .then(response => response.json())

const createUser = (user) =>
    // fetch(WIDGET_URL, {
    fetch(USER_URL, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json())

export default {
    createUser
}
