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

    }


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

                <label htmlFor="orders">Recent Purchases:</label>
                {
                    this.props.orders.map((order =>
                        <div>
                    {order.customerId === this.props.currentUser.userId &&
                     <Link to={`/search/q=identify/${order.recipeUri}`}>
                    <li >{order.name}</li>
                    </Link>

                        }
                        </div>
                    ))}


                {/*links to other users' public profile*/}
                {/*<p><Link to="/profile/12">user3</Link></p>*/}
                {/*<p><Link to="/profile/13">user4</Link></p>*/}


                <Link to={"/"}>
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

            </div>

        )
    }
}


const stateToPropertyMapper = (state) => ({
    order: state.orderReducer.order,
    orders: state.orderReducer.orders,
    currentUser: state.UserReducer.currentUser

})

const propertyToDispatchMapper = (dispatch) => ({
    profile: () => UserActions.profile(dispatch),
    updateProfile: (newProfile) => UserActions.updateProfile(newProfile, dispatch),
    saveProfile: (newProfile) => UserActions.saveProfile(newProfile, dispatch),
    findOrderForUser: (customerId) => OrderActions.findOrderForUser(dispatch,customerId)

})


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(ProfilePage)
