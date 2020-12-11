import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import UserService from "../services/UserService";
import UserActions from "../actions/UserActions";
import {connect} from "react-redux";
import {findOrderForUser} from "../services/OrderService";
import OrderActions from "../actions/OrderActions";


// the private profile page contains both the public info and private info
class ProfilePage extends React.Component {

    componentDidMount() {
        this.props.profile()
        if(this.props.currentUser != null){
            const customerId = this.props.currentUser.userId
            {this.props.findOrderForUser(customerId)}
        }
        if(this.props.allOrders != null) {
            {
                this.props.findAllOrders()
            }
        }
        {this.props.findAllUsers()}

    }

    // handleUser =() =>
    // {this.props.users != null &&
    // this.props.users.map((user)=>
    //
    //     <li>
    //         {user.userId === this.props.currentUser.userId &&
    //         this.props.deleteUser(user.userId)}
    //
    //     </li>
    // )}

    logout = () =>
        UserService.logout()
            .then(status => {
                // TODO: async function called in another async
                this.props.profile()
                this.props.history.push('/')
            })
    handleClick() {
        //do some expression
        window.location = 'http://localhost:3000/search/q=chicken/http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_b79327d05b8e5b838ad6cfd9576b30b6'
    }

    render() {
        if (!this.props.currentUser)
            return (
                <div className="text-center">
                    <h3>Login or register before viewing your profile</h3>
                    <Link to={`/home`} className="btn btn-link">Home</Link>
                    <Link to={`/login`} className="btn btn-link">Log in</Link>
                    <Link to={`/register`} className="btn btn-link">Register</Link>
                </div>
            )
        else return (
            <div>
                <h3>Profile</h3>
                <h5>Current user:
                    {this.props.currentUser ? this.props.currentUser.username : "anonymous"}
                </h5>

                {/*UserId field*/}
                <label htmlFor="userId-fld">User Id</label>
                <input
                    className="form-control"
                    id="userId-fld"
                    value={this.props.currentUser.userId}
                    readOnly
                />


                {/*Username field*/}
                <label htmlFor="username-fld">Username</label>
                <input
                    className="form-control"
                    id="username-fld"
                    placeholder="Your username"
                    value={this.props.currentUser.username}
                    onChange={(e) =>
                        this.props.updateProfile({...this.props.currentUser, username: e.target.value})}
                />

                <label htmlFor="firstname-fld">First Name</label>
                <input
                    className="form-control"
                    id="firstname-fld"
                    placeholder="John"
                    value={this.props.currentUser.firstName}
                    onChange={(e) =>
                        this.props.updateProfile({...this.props.currentUser, firstName: e.target.value})}
                />

                <label htmlFor="lastname-fld">Last Name</label>
                <input
                    className="form-control"
                    id="lastname-fld"
                    placeholder="Lennon"
                    value={this.props.currentUser.lastName}
                    onChange={(e) =>
                        this.props.updateProfile({...this.props.currentUser, lastName: e.target.value})}
                />


                {/*Usertype field*/}
                <label htmlFor="type-fld">User type</label>
                <input
                    className="form-control"
                    id="type-fld"
                    value={this.props.currentUser.type}
                    readOnly
                />


                {/*Password field*/}
                <label htmlFor="pw-fld">Password</label>
                <input
                    className="form-control"
                    id="pw-fld"
                    placeholder="*******"
                    value={this.props.currentUser.password}
                    onChange={(e) =>
                        this.props.updateProfile({...this.props.currentUser, password: e.target.value})}
                />


                <label htmlFor="email-fld">Email</label>
                <input className="form-control"
                       type="email"
                       id="email-fld"
                       placeholder="username@gmail.com"
                       value={this.props.currentUser.email}
                       onChange={(e) =>
                           this.props.updateProfile({...this.props.currentUser, email: e.target.value})}
                />

                <label htmlFor="location-fld">Location</label>
                <input
                    className="form-control"
                    id="location-fld"
                    placeholder="Dark side of the moon"
                    value={this.props.currentUser.location}
                    onChange={(e) =>
                        this.props.updateProfile({...this.props.currentUser, location: e.target.value})}
                />

                {this.props.currentUser &&
                this.props.currentUser.type === "CUSTOMER" &&
                    <div className="container">
                <label htmlFor="orders">Recent Purchases</label>
                    <div className="container">
                    {
                        this.props.orders.map((order =>
                                <div>
                                    {order.customerId === this.props.currentUser.userId &&
                                    // <Link to={`/search/q=identify/${order.recipeUri}`}>
                                    <Link to="/cart">
                                        <li>{order.name}</li>
                                    </Link>

                                    }
                                </div>
                        ))}
                    </div>
                    </div>
                }

                {this.props.currentUser &&
                this.props.currentUser.type === "DELIVERER" &&
                <div className="container">

                    <label htmlFor="orders">
                        <h4>Orders to be Delivered: </h4>
                    </label>
                    <div className="container">

                            {this.props.allOrders.map((ord)=>
                                <ul>
                                    {this.props.currentUser.userId === ord.delivererId &&
                                    // <Link to={`/search/q=identify/${ord.recipeUri}`}>
                                    <Link to="/cart">
                                    <li>
                                        {ord.name}
                                    </li>
                                    </Link>
                                    }
                                </ul>
                            )}

                    </div>
                </div>
                }


                {this.props.currentUser &&
                this.props.currentUser.type === "ADMIN" &&
                <div className="container">

                    <label htmlFor="orders">
                        <h4>Recent Orders </h4>
                    </label>
                    <div className="container">

                        {/*{this.props.allOrders.map((ord)=>*/}
                            <p>

                                {this.props.allOrders[this.props.allOrders.length-1].recipeUri != null ?
                                <Link to={`/search/q=identify/${this.props.allOrders[this.props.allOrders.length-1].recipeUri}`}>
                                    {/*<li>*/}
                                    {/*    {ord.name}*/}
                                    {/*</li>*/}
                                    <p>{this.props.allOrders[this.props.allOrders.length-1].name}</p>
                                </Link> : <p>{this.props.allOrders[this.props.allOrders.length-1].name}</p>
                                }
                            </p>
                        {/*)}*/}

                    </div>

                    <label htmlFor="orders">
                        <h4>Recent Users </h4>
                    </label>
                    <div className="container">


                            {this.props.users != null &&
                            // this.props.users.map(use =>
                            // <li>{use.username}</li>)
                            <Link to={`/profile/${this.props.users[this.props.users.length-1].userId}`}>
                                <p>{this.props.users[this.props.users.length-1].username}</p>
                            </Link>
                            }

                    </div>
                </div>
                }


                <Link to={"/"} className="btn btn-warning btn-block">
                <button className="btn btn-warning btn-block"
                        onClick={() => this.props.saveProfile(this.props.currentUser)}>
                    Save
                </button>
                </Link>

                <Link to={`/home`} className="btn btn-success btn-block">
                    Home
                </Link>

                <button className="btn btn-danger btn-block" onClick={this.logout}>
                    Logout
                </button>

                {/*<Link to={"/profile"} className="btn btn-danger btn-block">*/}
                <button className="btn btn-danger btn-block" onClick={()=>{this.props.deleteUser(this.props.currentUser.userId); this.logout()}}>
                    Delete Account
                </button>
                {/*</Link>*/}

            </div>

        )
    }
}


const stateToPropertyMapper = (state) => ({
    order: state.orderReducer.order,
    orders: state.orderReducer.orders,
    currentUser: state.UserReducer.currentUser,
    user: state.UserReducer.user,
    users: state.UserReducer.users,
    allOrders: state.orderReducer.allOrders,


})

const propertyToDispatchMapper = (dispatch) => ({
    profile: () => UserActions.profile(dispatch),
    updateProfile: (newProfile) => UserActions.updateProfile(newProfile, dispatch),
    saveProfile: (newProfile) => UserActions.saveProfile(newProfile, dispatch),
    findOrderForUser: (customerId) => OrderActions.findOrderForUser(dispatch,customerId),
    findAllOrders: () => OrderActions.findAllOrders(dispatch),
    findAllUsers: () => UserActions.findAllUsers(dispatch),
    // deleteUser: (userId) => UserActions.deleteUser(userId,dispatch)
    deleteUser: (userId) =>
        UserService.deleteUser(userId)
            .then(status => dispatch({
                type: "DELETE_USER",
                userId
            }))

})


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(ProfilePage)
