const ORDER_URL = "http://localhost:8080/api/orders"
const USER_URL = "http://localhost:8080/api/profiles"

export const findAllOrders = () =>
    fetch(ORDER_URL)
        .then(response => response.json())
export const findOrderForUser = (cid) =>
    fetch(`${ORDER_URL}/${cid}/orders`)
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
        method:"DELETE"
    }).then(response => findOrderForUser())
    // }).then(response => response.json())

const findDelivererForOrder = (order, currentUser) =>
    fetch((`${USER_URL}/${order.customerId}`))

export default {
    createOrder, findOrderForUser, deleteOrder
}
