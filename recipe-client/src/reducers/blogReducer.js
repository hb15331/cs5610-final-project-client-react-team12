const initialState = {
    blogs:[],
    allblogs:[]
}

const blogReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FIND_ALL_BLOGS":
            return {
                ...state,
                allblogs: action.allblogs
            }
        case "FIND_BLOGS_FOR_USER":
            return {
                ...state,
                blogs: action.blogs,
                customerId: action.customerId
            }

        case "FIND_ORDER_BY_ID":
            return {
                ...state,
                order: action.order,
                orderID: action.orderId

            }


        case "CREATE_BLOG":
            return {
                ...state,
                blogs: [
                    ...state.blogs,
                    action.blog
                ]
            }
        case "DELETE_BLOG":
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog.blogId !== action.blogId)
            }

        case "UPDATE_BLOG":
            return {
                blogs: state.blogs.map(
                    blog => blog.blogId === action.blog.blogId ?
                        action.blog : blog)
            }


        default:
            return state
    }
}

export default blogReducer
