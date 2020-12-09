import React from 'react'
import UserService from "../services/UserService";
import {Link} from "react-router-dom";
import UserActions from "../actions/UserActions";
import OrderActions from "../actions/OrderActions";
import {connect} from "react-redux";


class PublicProfilePage extends React.Component {

    state = {
        // public info of other user
        publicInfo: {
            username: '',
            type: '',
            email: '',
            location: '',
        }
    }


    componentDidMount() {
        const userId = this.props.match.params.uid
        UserService.findPublicProfileById(userId)
            .then(publicInfo => this.setState({publicInfo: publicInfo}))
        // const customerId = this.props.currentUser.userId
        {this.props.findOrderForUser(userId)}
    }


    render() {
        return (
            <div>
                <h3>Profile (Public)</h3>

                {/*/!*UserId field*!/*/}
                {/*<label htmlFor="userId-fld">User Id</label>*/}
                {/*<input*/}
                {/*    className="form-control"*/}
                {/*    id="userId-fld"*/}
                {/*    value={this.state.publicInfo.userId}*/}
                {/*    onChange={() => {}}*/}
                {/*/>*/}

                {/*Username field*/}
                <label htmlFor="username-fld">Username</label>
                <input
                    className="form-control"
                    id="username-fld"
                    value={this.state.publicInfo.username}
                    readOnly
                />

                {/*Usertype field*/}
                <label htmlFor="type-fld">User type</label>
                <input
                    className="form-control"
                    id="type-fld"
                    value={this.state.publicInfo.type}
                    readOnly
                />

                {/*Email*/}
                <label htmlFor="email-fld">Email</label>
                <input
                    className="form-control"
                    id="email-fld"
                    value={this.state.publicInfo.email}
                    readOnly
                />

                {/*Location*/}
                <label htmlFor="location-fld">Location</label>
                <input
                    className="form-control"
                    id="location-fld"
                    value={this.state.publicInfo.location}
                    readOnly
                />

                <h4>Orders from {this.state.publicInfo.username}:</h4>
                {
                    this.props.orders.map((ord)=>
                    <li>
                        {ord.name}
                    </li>
                    )
                }

                <div className="py-3">
                    <button className="btn btn-danger btn-block" onClick={this.props.history.goBack}>Back</button>
                </div>

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


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(PublicProfilePage)
