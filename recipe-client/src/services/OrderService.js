const ORDER_URL = "http://localhost:8080/api/orders"
const USER_URL = "http://localhost:8080/api/profiles"

// const ORDER_URL = "https://tranquil-lake-30486.herokuapp.com//api/orders"
// const USER_URL = "https://tranquil-lake-30486.herokuapp.com//api/profiles"



export const findAllOrders = () =>
    fetch(ORDER_URL)
        .then(response => response.json())

export const findOrderForUser = (cid) =>
    fetch(`${ORDER_URL}/${cid}/orders`)
        .then(response => response.json())

export const findOrderById = (orderId) =>
    fetch(`${ORDER_URL}/${orderId}`)
        .then(response => response.json())

export const createOrder = (order) =>
    // fetch(WIDGET_URL, {
    fetch(ORDER_URL, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json())

const deleteOrder = (oid) =>
    fetch(`${ORDER_URL}/${oid}`, {
        method: "DELETE"
    })




const updateOrder = (orderId, delivererId, newOrder) =>
    fetch(`${ORDER_URL}/${orderId}`, {
        method: "PUT",
        body: JSON.stringify(newOrder),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())

const updateOrderAsComplete = (orderId, delivererId, newOrder) =>
    fetch(`${ORDER_URL}/${orderId}`, {
        method: "PUT",
        body: JSON.stringify(newOrder),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())

const findDeliverersForOrder = (userId) =>
    fetch(`${USER_URL}/${userId}/deliverers`)
        .then(response => response.json())

export default {

    createOrder, findOrderForUser, deleteOrder, findAllOrders,findDeliverersForOrder, updateOrder, findOrderById,
    updateOrderAsComplete

}
