import React from 'react'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import UserService from "../services/UserService";
import UserActions from "../actions/UserActions";
import {connect} from "react-redux";


// TODO: Allow the current user to edit the profile

class ProfilePage extends React.Component {

    componentDidMount() {
        this.props.profile()
    }


    logout = () =>
        UserService.logout()
            .then(status => {
                // TODO: async function called in another async
                this.props.profile()
                this.props.history.push('/')
            })


    render() {
        if (!this.props.currentUser)
            return (
                <div>
                    <h3>Create an account first before viewing your profile</h3>
                    <Link to={`/home`} className="btn btn-link">Home</Link>
                    <Link to={`/register`} className="btn btn-link">Register</Link>
                </div>
            )
        else return (
            <div>
                <h5>Profile</h5>
                <h5>Current user:
                    {this.props.currentUser ? this.props.currentUser.username : "anonymous"}
                </h5>

                {/*UserId field*/}
                <label htmlFor="userId-fld">User Id</label>
                <input
                    className="form-control"
                    id="userId-fld"
                    value={this.props.currentUser.userId}
                    onChange={() => {}}
                />


                {/*Username field*/}
                <label htmlFor="username-fld">Username</label>
                <input
                    className="form-control"
                    id="username-fld"
                    value={this.props.currentUser.username}
                    onChange={(e) =>
                        this.props.updateProfile({...this.props.currentUser, username: e.target.value})}
                />


                {/*Usertype field*/}
                <label htmlFor="type-fld">User type</label>
                <input
                    className="form-control"
                    id="type-fld"
                    value={this.props.currentUser.type}
                    onChange={() => {}}
                />


                {/*Password field*/}
                <label htmlFor="pw-fld">Password</label>
                <input
                    className="form-control"
                    id="pw-fld"
                    value={this.props.currentUser.password}
                    onChange={(e) =>
                        this.props.updateProfile({...this.props.currentUser, password: e.target.value})}
                />


                <label htmlFor="email-fld">Email</label>
                <input className="form-control"
                       type="email"
                       id="email-fld"
                       value={this.props.currentUser.email}
                       onChange={(e) =>
                           this.props.updateProfile({...this.props.currentUser, email: e.target.value})}
                />

                <label htmlFor="location">Location</label>
                <input className="form-control" type="text" id="location"/>

                <label htmlFor="orders">Orders</label>

                <button className="btn btn-warning btn-block"
                        onClick={() => this.props.saveProfile(this.props.currentUser)}>
                    Save
                </button>

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
    currentUser: state.UserReducer.currentUser
})

const propertyToDispatchMapper = (dispatch) => ({
    profile: () => UserActions.profile(dispatch),
    updateProfile: (newProfile) => UserActions.updateProfile(newProfile, dispatch),
    saveProfile: (newProfile) => UserActions.saveProfile(newProfile, dispatch)
})


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(ProfilePage)
