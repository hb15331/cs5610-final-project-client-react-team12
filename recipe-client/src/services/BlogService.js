import {createOrder, findAllOrders, findOrderById, findOrderForUser} from "./OrderService";

const BLOG_URL = "http://localhost:8080/api/blogs"


export const findAllBlogs = () =>
    fetch(BLOG_URL)
        .then(response => response.json())

export const findBlogForUser = (cid) =>
    fetch(`${BLOG_URL}/${cid}/blogs`)
        .then(response => response.json())

export const createBlog = (blog) =>
    fetch(BLOG_URL, {
        method: "POST",
        body: JSON.stringify(blog),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json())


const deleteBlog = (bid) =>
    fetch(`${BLOG_URL}/${bid}`, {
        method: "DELETE"
    })

const updateBlog = (blogId, newBlog) =>
    fetch(`${BLOG_URL}/${blogId}`, {
        method: "PUT",
        body: JSON.stringify(newBlog),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())

export default {
    findAllBlogs, findBlogForUser, createBlog,updateBlog, deleteBlog

}
