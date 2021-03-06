import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import '../styling/BlogEntryStyle.css'
import SearchRecipe from "./SearchRecipe";
import "../styling/HomePageStyle.css"
import {connect} from "react-redux";
import UserActions from "../actions/UserActions";
import orderService, {findOrderForUser} from "../services/OrderService";
import BlogService, {findBlogForUser} from "../services/BlogService";
import OrderActions from "../actions/OrderActions";



class BlogEntry extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.profile()
        if(this.props.currentUser != null) {
            const customerId = this.props.currentUser.userId
            {this.props.findOrderForUser(customerId)}
            {
                this.props.findBlogForUser(customerId)
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //{this.props.profile()}
    }


    render() {
        return (
            <div className="container-fluid">
                <Link to={"/home"}>
                    <i className="fa fa-home fa-2x btn pull-right btn-sm"></i>

                </Link>
                <h1>Blogs <i className="fa fa-plus-square"
                             onClick={()=>this.props.createBlog(this.props.currentUser.userId, "New Title", "New Entry")}></i></h1>




<ol>
                {this.props.currentUser.type === "CUSTOMER" &&
                    this.props.blogs.map((blog) =>
                        <li key={blog._id}>

                            {
                                !blog.editing &&
                                <span>
                                     <i className="fa fa-times pull-right"
                                        onClick={() => this.props.deleteBlog(blog.blogId)}></i>
                                    <i className="fa fa-pencil pull-right"
                                       onClick={() => this.props.edit(blog)}></i>

                                    <label htmlFor="title-fld"></label>
                                    <div id="title-fld"><h3>{blog.title}</h3></div>
                                    <label htmlFor="entry-fld"></label>
                                    <div id="entry-fld"><p>{blog.entry}</p></div>


                            </span>
                            }
                            {
                                blog.editing &&

                                <span >
                                        <i className="fa fa-check pull-right"
                                           onClick={() => this.props.ok(blog)}></i>
                                         {/*<i className="fa fa-times pull-right"*/}
                                         {/*   onClick={() => deleteLesson(lesson._id)}></i>*/}
                                    <div className="container-fluid">

                                        <select id="heading-list"
                                                onChange={(event) => this.props.updateBlog({
                                                    ...blog,
                                                    title: event.target.value
                                                })}
                                                value={blog.title}
                                        >

                                            {this.props.orders.map((order =>
                        <option value={order.name}>{order.name}</option>
                                                ) )}
                    </select>

                    {/*<input*/}
                    {/*    onChange={(event) => this.props.updateBlog({*/}
                    {/*        ...blog,*/}
                    {/*        title: event.target.value*/}
                    {/*    })}*/}
                    {/*    value={blog.title}*/}
                    {/*/>*/}
                     </div>
                                   <div className="container-fluid">
                    <textarea
                        onChange={(event) => this.props.updateBlog({
                            ...blog,
                            entry: event.target.value
                        })}
                        value={blog.entry}
                    />
                                   </div>
                  </span>

                            }
                        </li>


                )}



    {this.props.currentUser.type === "DELIVERER" &&
    this.props.blogs.map((blog) =>
        <li key={blog._id}>

            {
                !blog.editing &&
                <span>
                                     <i className="fa fa-times pull-right"
                                        onClick={() => this.props.deleteBlog(blog.blogId)}></i>
                                    <i className="fa fa-pencil pull-right"
                                       onClick={() => this.props.edit(blog)}></i>

                                    <label htmlFor="title-fld"></label>
                                    <div id="title-fld"><h3>{blog.title}</h3></div>
                                    <label htmlFor="entry-fld"></label>
                                    <div id="entry-fld"><p>{blog.entry}</p></div>


                            </span>
            }
            {
                blog.editing &&

                <span >
                                        <i className="fa fa-check pull-right"
                                           onClick={() => this.props.ok(blog)}></i>
                    {/*<i className="fa fa-times pull-right"*/}
                    {/*   onClick={() => deleteLesson(lesson._id)}></i>*/}
                    <div className="container-fluid">



                        <input
                            onChange={(event) => this.props.updateBlog({
                                ...blog,
                                title: event.target.value
                            })}
                            value={blog.title}
                        />
                     </div>
                                   <div className="container-fluid">
                    <textarea
                        onChange={(event) => this.props.updateBlog({
                            ...blog,
                            entry: event.target.value
                        })}
                        value={blog.entry}
                    />
                                   </div>
                  </span>

            }
        </li>


    )}
</ol>
            </div>

        )
    }
}

const stateToPropertyMapper = (state) => ({
    currentUser: state.UserReducer.currentUser,
   blogs: state.blogReducer.blogs,
    blog: state.blogReducer.blog,
    order:state.orderReducer.order,
    orders:state.orderReducer.orders
})

const propertyToDispatchMapper = (dispatch) => ({
    profile: () => UserActions.profile(dispatch),
    findBlogForUser: (customerId) => BlogService.findBlogForUser(customerId)
        .then(blogs => dispatch({
            type: "FIND_BLOGS_FOR_USER",
            blogs,
            customerId
        })),
    createBlog: (customerId, title, entry)=>
        BlogService.createBlog({customerId:customerId, title:title, entry:entry})
            .then(blog => dispatch({
                type: "CREATE_BLOG",
                blog:blog
            })),
    ok: (blog) =>
        BlogService.updateBlog( blog.blogId,{
            ...blog,editing:false
        }).then(status => dispatch({
            type: "UPDATE_BLOG",
            blog: {...blog, editing:false}
        })),
    edit: (blog) =>
        BlogService.updateBlog(blog.blogId,{
            ...blog, editing: true
        }).then(status =>
            dispatch({
                type: "UPDATE_BLOG",
                blog: {...blog, editing: true}
            })),
    updateBlog: (blog) =>
        dispatch({
            type: "UPDATE_BLOG",
            blog:blog
        }),
    deleteBlog: (blogId) =>
        BlogService.deleteBlog(blogId)
            .then(status => dispatch({
                type: "DELETE_BLOG",
                blogId
            })),
    findOrderForUser: (customerId) => OrderActions.findOrderForUser(dispatch,customerId),
})

export default connect(stateToPropertyMapper, propertyToDispatchMapper)(BlogEntry)
