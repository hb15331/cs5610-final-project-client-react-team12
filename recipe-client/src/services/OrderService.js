const ORDER_URL = "http://localhost:8080/api/orders"

const findAllOrders = () =>
    fetch(ORDER_URL)
        .then(response => response.json())

const createOrder = (order) =>
    // fetch(WIDGET_URL, {
    fetch(ORDER_URL, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json())
export default {
    createOrder
}
